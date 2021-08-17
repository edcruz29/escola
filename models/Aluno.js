module.exports = (sequelize, DataTypes)=>{
    const Aluno = sequelize.define('Aluno',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nome:DataTypes.STRING,
        sobrenome:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            allowNull:true
        },
        ano_matricula:DataTypes.INTEGER,
    }, {
        tableName:'alunos', 
        timestamps:false
    })
    return Aluno
}