// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nome: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      senha: DataTypes.STRING,
      hottok: DataTypes.STRING,
      configuracoesSMTP: DataTypes.JSON,
      subdominioPersonalizado: DataTypes.STRING,
      dominioProprio: DataTypes.STRING
    }, {});
    
    User.associate = function(models) {
      User.hasMany(models.Produto, { foreignKey: 'userId' });
      User.hasMany(models.Venda, { foreignKey: 'userId' });
    };
  
    return User;
  };
  