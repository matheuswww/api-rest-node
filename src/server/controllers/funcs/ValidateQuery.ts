import { Request, Response } from 'express';

export function ValidateQuery<T>(req:Request<{},{},{},T>,res:Response,values:string[]) {
  if(req.query) {
    const correctValues:string[] = values;
    const validation:string[] | [] = Object.keys(req.query).map((item) => {
      const errors:boolean = correctValues.includes(item);
      if(!errors) return item;
      return '';
    }).filter((item) => item !== '');
    
    if(validation.length) {
      const body = validation.map((item) => {
        return { ...{ wrongPropriety: `A propriedade '${item}' não existe na busca,use: ${correctValues.map((item) => item)}`},};
      });
      return res.status(400).json({
        errors: {
          body,
        },
      });
    }
  }
}