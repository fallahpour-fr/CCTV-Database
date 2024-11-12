import { Request, Response, NextFunction } from 'express';
import  sequelize from '../models';
import {validationResult} from "express-validator";

export const zoneController = {
    async create(req:Request, res:Response, next:NextFunction) {
        const {label}=req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }
        try {
          const zone=await sequelize.sequelize.model("Zone").create({
            label:label
            });
      
            res.status(200).json({ message: 'Zone create successfully',data:zone });
      
        } catch (error) {
            next(error);
        }
    },
    async get(req:Request, res:Response, next:NextFunction) {
        const zoneId = req.params.id;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }
        try {
            const zone=await sequelize.sequelize.model("Zone").findOne({
                where:{id:zoneId}
            })
        
              res.status(200).json({ message: 'Zone create successfully',data:zone });
        
          } catch (error) {
              next(error);
          }
    },
    async update(req: Request, res: Response, next: NextFunction) {
        const zoneId = req.params.id;
        const zoneData = req.body;    
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }

        if (!zoneData) {
          res.status(400).json({ status: 400, statustext: 'Bad Request', message: 'Invalid Zone data' });
          return;
        }
    
        try {
          const [updated] = await sequelize.sequelize.model("Zone").update(zoneData, { where: { id: zoneId } });
          if (updated) {
            const updatedZone = await sequelize.sequelize.model("Zone").findByPk(zoneId);
            res.status(200).json({ status: 200, statustext: 'Ok', message: 'Zone updated successfully', data: updatedZone });
          } else {
            res.status(404).json({ status: 404, statustext: 'Not Found', message: 'Zone not found' });
          }
        } catch (error) {
          next(error);
        }
      },
    async delete(req:Request, res:Response, next:NextFunction) {
        try {
            const zoneId = req.params.id;
            const result = await sequelize.sequelize.model("Zone").destroy({
                where: { id: zoneId }
            });
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              res.status(400).json({ errors: errors.array() });
              return;
            }

            if (result) {
                res.status(200).json({
                    status: 200,
                    statustext: 'Delete',
                    message: 'Zone deleted successfully'
                });
            } else {
                res.status(404).json({
                    status: 404,
                    statustext: 'Not Found',
                    message: 'Zone not found'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    },
    async getAll(req:Request, res:Response, next:NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;
        }
        try {
            const zones = await sequelize.sequelize.model("Zone").findAll();
            res.status(200).json({
                status: 200,
                statustext: 'Get All Zones',
                message: 'Zone deleted successfully',
                data:zones
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    },
}
