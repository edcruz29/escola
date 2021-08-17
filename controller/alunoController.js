const {Aluno, sequelize} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const alunoController={
    index:async (req,res)=>{
        const {page=1} = req.query;
        const {count:total, rows:alunos} = await Aluno.findAndCountAll({
            limit:4,
            offset:(page-1) * 4
        });
        const totalPagina = Math.round(total/4)
        return res.render('alunos', {alunos, totalPagina})
    },
    findByID:async (req,res)=>{
        const{id} = req.params;

        const aluno = await Aluno.findOne({
            where:{
                id
            }
        })
        return res.render('detalhe_aluno', {aluno});
    
    },
    search: async (req,res)=>{
        const {key} = req.query;
        const {page=1} = req.query;
        const {count:total, rows:alunos} = await Aluno.findAndCountAll({
            where:{
                nome:{
                    [Op.like]:`%${key}%`
                }
            },
            order:[
                ['nome','DESC']
            ],
            limit:3,
            offset:(page-1) * 3
        });
        const totalPagina = Math.round(total/3)
        return res.render('alunos', {alunos, totalPagina})
    },
    create: (req,res)=>{
        return res.render('cadastroUsuario')
    },
    store:async (req,res)=>{
        const {nome, sobrenome, email, ano_matricula} = req.body;

      await Aluno.create({
            nome,
            sobrenome,
            email,
            ano_matricula
        })
        return res.redirect('/users');
    },
    bulkCreate: async (req,res)=>{
        const listaDeAlunos =[
            {nome:"Gibimba", sobrenome:"FalaDele", email:"gibimba@dhmail.com", ano_matricula:"2011"},
            {nome:"Florinda", sobrenome:"Mesa", email:"donaflorinda@dhmail.com", ano_matricula:"1960"},
            {nome:"Ramon", sobrenome:"Don", email:"srmadruga@dhmail.com", ano_matricula:"1956"}
        ];
        const resultado = await Aluno.bulkCreate(listaDeAlunos);
        res.send("criados");
    },
    edit: async (req,res)=>{
        const {id} = req.params
        const aluno = await Aluno.findByPk(id);
        return res.render('editarUsuario',{aluno})
    },
    update: async(req,res)=>{
        const {id} = req.params
        const {nome, sobrenome, email, ano_matricula} = req.body;

      await Aluno.update({
            nome,
            sobrenome,
            email,
            ano_matricula 
        },{
            where:{
                id
            }
        })
        return res.redirect('/users');
    },
    destroy: async(req,res)=>{
        const {id} = req.params
        await Aluno.destroy({
            where:{
                id
            }
        })
        return res.redirect('/users');
    }
}
module.exports = alunoController;