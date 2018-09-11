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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
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
        unique: true,
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
    promoCount:{
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },
    startAtDate:{
        allowNull: true,
        type: Sequelize.DataTypes.DATEONLY
    },
    expireAtDate:{
        allowNull: true,
        type: Sequelize.DataTypes.DATEONLY
    }

},{
    createdAt: true,
    updatedAt: true
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
    },
    description:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING(200)
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

WordsConstans.belongsToMany( Langs, { through: Translations , foreignKey: 'languageID'} );
Langs.belongsToMany( WordsConstans, { through: Translations , foreignKey: 'constantID' } );

Translations.belongsTo( Langs , { foreignKey: 'languageID' } );
Translations.belongsTo( WordsConstans , { foreignKey: 'constantID', as: 'constant' } );


const Users = connection.define('users',{
    userEmail:{
        primaryKey: true,
        allowNull:false,
        unique: true,
        type:Sequelize.DataTypes.STRING(50)
    },
    userName:{
        allowNull:false,
        type:Sequelize.DataTypes.STRING(50)
    }
},{
    createdAt: false,
    updatedAt: false
});

const Phones = connection.define('phones',{
    phoneID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    phoneNumber:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
},{
    createdAt: false,
    updatedAt: false
});

const Cards = connection.define('cards',{
    cardID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    cardNumber:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    yearEnd:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
    },
    cvv:{
        allowNull: false,
        type: Sequelize.DataTypes.TINYINT
    },
    userCardName:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    }
},{
    createdAt:false,
    updatedAt:false
});

const Orders = connection.define('orders',{
    orderID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    orderAdress:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    orderDate:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
    },

},{
    createdAt:false,
    updatedAt:false
});

const OrdersAndProduct = connection.define('OrdersProduct',{
    ID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
},{
    createdAt:false,
    updatedAt:false
});

Cards.belongsTo(Users,{ foreignKey: 'userEmail' });
Phones.belongsTo(Users,{ foreignKey: 'userEmail' });
Orders.belongsTo(Users,{ foreignKey: 'userEmail' });
Orders.belongsTo(PromoCodes,{ foreignKey: 'promoID' });

Orders.belongsToMany(Product,{through:OrdersAndProduct, foreignKey: 'orderID'});
Product.belongsToMany(Orders,{through:OrdersAndProduct, foreignKey: 'productID'});

//Users.sync({force: true});
// Phones.sync({force:true});
// Cards.sync({force:true});
// Orders.sync({force:true});
//OrdersAndProduct.sync({force:true});

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

const News  = connection.define('news',{

    newsID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    newsTitle:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    newsText:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING(1000)
    },
    image: Sequelize.DataTypes.VIRTUAL
},{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
  }
);

const newsImage=connection.define('newsImage',{
    imageID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    newsID:{
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
    },
    {

        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

newsImage.belongsTo(News , { foreignKey: 'newsID' });
// News.sync({force: true});
//newsImage.sync({force: true});

const FeedBack = connection.define('feedBack',{

    feedBackID:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER
    },
    fUserName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate:{
            is: RegularExpressions.UserNameExpression
        }

    },
    fUserEmail:{
        type: Sequelize.DataTypes.STRING(75),
        allowNull: false,
        validate:{
            is: RegularExpressions.EmailExpression,
        }
    },
    fUserPhone:{
        type: Sequelize.DataTypes.STRING(16),
        allowNull: false,
        validate:{
            is: RegularExpressions.PhoneExpression,
        }
    },
    fMessage:{
        type: Sequelize.DataTypes.STRING(1500),
        allowNull: false,
        validate:{
            is: RegularExpressions.ProductDescriptionExpression
        }
    },
    fProcessed:{
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,

    },


},{
    createdAt: 'created',
    updatedAt: 'updated'
});

//FeedBack.sync({force: true});



const Users = connection.define('users',{
    userID:{
        primaryKey: true,
        allowNull:false,

        autoIncrement: true,

        type:Sequelize.DataTypes.INTEGER
    },
    userEmail:{
        allowNull:false,
        unique: true,
        type:Sequelize.DataTypes.STRING(50)
    },
    userName:{
        allowNull:false,
        type:Sequelize.DataTypes.STRING(50)
    },
    userPhone:{
        allowNull:false,
        type:Sequelize.DataTypes.STRING(50)
    },
},{
    createdAt: false,
    updatedAt: false
});


const Cards = connection.define('cards',{
    cardID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    cardNumber:{
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    year:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    month:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    cvv:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    userCardName:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    }
},{
    createdAt:false,
    updatedAt:false
});

const Orders = connection.define('orders',{
    orderID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    orderAdress:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING(1000)
    },
    orderMessage:{
        allowNull: true,
        type: Sequelize.DataTypes.STRING(1000)
    },
    orderDate:{
        allowNull: false,
        type: Sequelize.DataTypes.DATE
    },
    totalPrice:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    totalPriceWithPromo:{
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER
    },
    numberCard:{
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    }

},{
    createdAt:'',
    updatedAt:''
});

const OrdersAndProduct = connection.define('OrderDetails',{
    ID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    productPrice:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    productAmount:{
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    }
},{
    createdAt:'',
    updatedAt:''
});

const UserAndCart = connection.define('UserAndCard',{
    ID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
},{
    createdAt: false,
    updatedAt:false
});

const StatusOrder = connection.define('statusOrder',{
    statusID:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
    },
    statusTitle:{
        allowNull: false,
        unique:true,
        type: Sequelize.DataTypes.STRING(50)
    }
},{
    createdAt:false,
    updatedAt:false
});

Orders.belongsTo(Users,{ foreignKey: 'userID' });

Orders.belongsTo(PromoCodes,{ foreignKey: 'promoID' });
Orders.belongsTo(StatusOrder,{ foreignKey: 'statusID' });

Users.belongsToMany(Cards,{through:UserAndCart, foreignKey: 'userID'});
Cards.belongsToMany(Users,{through:UserAndCart, foreignKey: 'cardID'});

Orders.belongsToMany(Product,{through:OrdersAndProduct, foreignKey: 'orderID'});
Product.belongsToMany(Orders,{through:OrdersAndProduct, foreignKey: 'productID'});


// Users.sync({force: true});
// Cards.sync({force:true});
//PromoCodes.sync({force:true});
// Orders.sync({force:true});
// OrdersAndProduct.sync({force:true});
// UserAndCart.sync({force:true});
// StatusOrder.sync({force:true});


module.exports.News=News;
module.exports.newsImage=newsImage;
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

module.exports.FeedBack= FeedBack;

module.exports.Users = Users;
module.exports.Cards = Cards;
module.exports.Orders = Orders;
module.exports.OrdersAndProduct = OrdersAndProduct;
module.exports.UsersAndCart = UserAndCart;
module.exports.StatusOrder = StatusOrder;
