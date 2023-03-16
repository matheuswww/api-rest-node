import { RequestHandler } from 'express';
import { AnyObject, Maybe, ObjectSchema,ValidationError } from 'yup';

type TPropriety = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TAllSchemas = Record<TPropriety,ObjectSchema<any>>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation:TValidation = (getAllSchemas) => async (req,res,next) => {
  const schemas = getAllSchemas(schema => schema);
  const errosResult: Record<string,Record<string,string>> = {};

  Object.entries(schemas).forEach(([key,schema]) => {
    try {
      schema.validateSync(req[key as TPropriety],{abortEarly: false});
    } catch (error) {
      const yupError = error as ValidationError;
      const erros: Record<string,string> = {};

      yupError.inner.forEach((error) => {
        if(!error.path) return;
        erros[error.path] = error.message;
      });

      errosResult[key] = erros;
    }
  });

  if(Object.entries(errosResult).length === 0) {
    return next();
  } else {
    return res.status(400).json({erros:errosResult});
  }
};