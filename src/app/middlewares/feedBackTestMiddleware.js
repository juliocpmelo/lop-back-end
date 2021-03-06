const path = require('path')
const sequelize = require('../../database/connection')
const {Test,Question,Class,Submission,User,ClassHasTest} = sequelize.import(path.resolve(__dirname,'..','models'))

class FeedBackTestMiddleware{
    async index_paginate(req,res,next){
        const idClass = req.query.idClass;
        const idTest = req.query.idTest;
        const isUuid = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        if(req.userProfile!=="PROFESSOR"){
            return res.status(401).json({msg:"Sem permissão"})
        }
        
        if(!idClass || (idClass && !isUuid.test(idClass))){
            return res.status(404).json({msg:'página não encontrada'})
        }
        if(!idTest || (idTest && !isUuid.test(idTest))){
            return res.status(404).json({msg:'página não encontrada'})
        }

		return next()
    }
    async show(req,res,next){
        const idClass = req.query.idClass;
        const idTest = req.query.idTest;
        const idUser = req.query.idUser;
        const isUuid = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        if(req.userProfile!=="PROFESSOR"){
            return res.status(401).json({msg:"Sem permissão"})
        }
        
        if(!idUser || (idUser && !isUuid.test(idUser))){
            return res.status(404).json({msg:'página não encontrada'})
        }
        if(!idClass || (idClass && !isUuid.test(idClass))){
            return res.status(404).json({msg:'página não encontrada'})
        }
        if(!idTest || (idTest && !isUuid.test(idTest))){
            return res.status(404).json({msg:'página não encontrada'})
        }

		return next()
    }
    
    async store(req,res,next){

        const idClass = req.body.class_id;
        const idTest = req.body.test_id;
        const idUser = req.body.user_id;
        const idQuertion = req.body.question_id;
        const isUuid = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        if(req.userProfile!=="PROFESSOR"){
            return res.status(401).json({msg:"Sem permissão"})
        }
        
        if(!idUser || (idUser && !isUuid.test(idUser))){
            return res.status(400).json({msg:'user_id é obrigatório'})
        }
        if(!idClass || (idClass && !isUuid.test(idClass))){
            return res.status(400).json({msg:'class_id é obrigatório'})
        }
        if(!idTest || (idTest && !isUuid.test(idTest))){
            return res.status(400).json({msg:'test_id é obrigatório'})
        }
        if(!idQuertion || (idQuertion && !isUuid.test(idQuertion))){
            return res.status(400).json({msg:'question_id é obrigatório'})
        }
        if(req.userProfile!=="PROFESSOR"){
            return res.status(401).json({msg:"Sem permissão"})
        }
		return next()
	}
}
module.exports = new FeedBackTestMiddleware()