"use strict";

const Sequelize = require('sequelize');

const RegularExpressions = require('./RegularExpressions');

const connection = require('../routes/connection');

const Category = connection.define('productcategories',{

    categoryID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    categoryTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    }

},{
    createdAt: false,
    updatedAt: false
});

const Product = connection.define('products',{

    productID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    productTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductTitleExpression
        }

    },
    productDescription:{
        type: Sequelize.DataTypes.STRING(1500),
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductDescriptionExpression,
        }
    },
    productPrice:{
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    image: Sequelize.DataTypes.VIRTUAL

},{
    createdAt: 'created',
    updatedAt: 'updated'
});

const ProductAndCategories = connection.define('pCategories',{

    ID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    }

},{
    createdAt: false,
    updatedAt: false
});

const ProductAttributes = connection.define('attributes',{

    attributeID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    attributeTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.CategoryTitleExpression
        }

    },
    attributeValue: {
        type:Sequelize.DataTypes.VIRTUAL
    }

},{
    createdAt: false,
    updatedAt: false
});

const ProductAndAttributes = connection.define('pAttributes',{

    ID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    attributeValue:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }

},{
    createdAt: false,
    updatedAt: false
});

const ProductImages = connection.define('pImages', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    productID: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    imagePath:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING(1500),
        validate:{
            min: 2,
            max: 1500
        }
    }
},{
    createdAt: false,
    updatedAt: false
});

const PromoCodes = connection.define('promoCodes',{

    promoCodeID:{
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },
    discountCode:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    discount:{
      allowNull: false,
      type: Sequelize.DataTypes.TINYINT
    },
    delivery:{
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },

},{
    createdAt: false,
    updatedAt: false
});


Product.belongsToMany( Category , { through: ProductAndCategories , foreignKey: 'productID' , as: 'categories' });
Category.belongsToMany( Product ,  { through: ProductAndCategories , foreignKey: 'categoryID'});

Product.belongsToMany( ProductAttributes , { through: ProductAndAttributes , foreignKey: 'productID'});
ProductAttributes.belongsToMany( Product , { through: ProductAndAttributes , foreignKey:'attributeID'});

ProductImages.belongsTo(Product , { foreignKey: 'productID' });

const Langs = connection.define( 'langs' , {

    languageID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.TINYINT
    },
    languageTitle:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    languageImage: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(1500)
    }

},{
    createdAt: false,
    updatedAt: false
});

const WordsConstans = connection.define( 'wordsConstants' , {

    constantID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    constantTitle:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    }

},{
    createdAt: false,
    updatedAt: false
});

const Translations = connection.define( 'translations' , {

    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    translation: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    }

},{
    createdAt: false,
    updatedAt: false
});

WordsConstans.belongsToMany( Langs, { through: Translations , foreignKey: 'constantID' } );
Langs.belongsToMany( WordsConstans, { through: Translations , foreignKey: 'langID' } );

//PromoCodes.sync({force: true});

// WordsConstans.sync({force: true});
// Translations.sync({force: true});
//Langs.sync({force: true});

//Product.sync({force: true});
//Category.sync({force: true});
// ProductAndCategories.sync({force: true});
// ProductAttributes.sync({force: true});
//ProductAndAttributes.sync({force: true});
// ProductImages.sync({force: true});

module.exports.Category = Category;
module.exports.Product = Product;
module.exports.ProductAndCategories = ProductAndCategories;

module.exports.ProductAttributes = ProductAttributes;
module.exports.ProductAndAttributes = ProductAndAttributes;
module.exports.ProductImages = ProductImages;
module.exports.Langs = Langs;
module.exports.WordsConstans = WordsConstans;
module.exports.Translations = Translations;
module.exports.PromoCodes = PromoCodes;
