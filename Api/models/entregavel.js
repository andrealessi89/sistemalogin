// models/entregavel.js
module.exports = (sequelize, DataTypes) => {
    const Entregavel = sequelize.define('Entregavel', {
      tipo: DataTypes.STRING,
      conteudo: DataTypes.TEXT,
      produtoId: DataTypes.INTEGER
    }, {});
  
    Entregavel.associate = function(models) {
      Entregavel.belongsTo(models.Produto, { foreignKey: 'produtoId' });
    };
  
    return Entregavel;
  };
  