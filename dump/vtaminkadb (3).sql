-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 17 2018 г., 09:14
-- Версия сервера: 5.7.19
-- Версия PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `vtaminkadb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `attributes`
--

DROP TABLE IF EXISTS `attributes`;
CREATE TABLE IF NOT EXISTS `attributes` (
  `attributeID` int(11) NOT NULL AUTO_INCREMENT,
  `attributeTitle` varchar(255) NOT NULL,
  PRIMARY KEY (`attributeID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attributes`
--

INSERT INTO `attributes` (`attributeID`, `attributeTitle`) VALUES
(1, 'Состав'),
(2, 'Дозировка на год'),
(3, 'Дозировка на 6 месяцев'),
(4, 'Противопоказания'),
(5, 'Дополнительные факты'),
(6, 'Количество в упаковке');

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

DROP TABLE IF EXISTS `cards`;
CREATE TABLE IF NOT EXISTS `cards` (
  `cardID` int(11) NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `cvv` int(11) NOT NULL,
  `userCardName` varchar(255) NOT NULL,
  PRIMARY KEY (`cardID`),
  UNIQUE KEY `cardNumber` (`cardNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cards`
--

INSERT INTO `cards` (`cardID`, `cardNumber`, `year`, `month`, `cvv`, `userCardName`) VALUES
(1, '2589-2589-2568-2562', 1235, 25, 123, 'OLGA');

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `feedBackID` int(11) NOT NULL AUTO_INCREMENT,
  `fUserName` varchar(255) NOT NULL,
  `fUserEmail` varchar(75) NOT NULL,
  `fUserPhone` varchar(16) NOT NULL,
  `fMessage` varchar(1500) NOT NULL,
  `fProcessed` tinyint(1) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`feedBackID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`feedBackID`, `fUserName`, `fUserEmail`, `fUserPhone`, `fMessage`, `fProcessed`, `created`, `updated`) VALUES
(1, 'Alex', 'alex@mail.ru', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:05:07', '2018-09-06 08:05:50'),
(2, 'Alex', 'alex@mail.ru', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:06:23', '2018-09-06 08:07:03'),
(3, 'Alex', 'ovsyanikov@gmail.com', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:16:45', '2018-09-06 08:17:27'),
(4, 'Alex', 'ovsyanikov@itstep.org', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:18:05', '2018-09-06 08:18:13'),
(5, 'Alex', 'ovsyanikov@itstep.org', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:23:06', '2018-09-06 08:23:13'),
(6, 'Alex', 'alex@gmail.com', '+436278467234', 'HEllo!', 0, '2018-09-17 07:27:07', '2018-09-17 07:27:07'),
(7, 'Alex', 'alex@gmail.com', '+2374982374', 'Hello!', 0, '2018-09-17 07:29:53', '2018-09-17 07:29:53'),
(8, 'Alex', 'alex@gmai.com', '+432789732847', 'HellO!', 0, '2018-09-17 07:30:50', '2018-09-17 07:30:50'),
(9, 'Alex', 'alex@gmail.com', '+342789324988', 'HEllo!', 0, '2018-09-17 08:04:09', '2018-09-17 08:04:09'),
(10, 'Alex', 'alex@gmail.com', '+478326473267', 'Test message', 0, '2018-09-17 08:07:18', '2018-09-17 08:07:18'),
(11, 'Alex', 'alex@gmail.com', '+473624737277', 'Test message', 0, '2018-09-17 08:08:23', '2018-09-17 08:08:23'),
(12, 'Alex', 'alex@gmail.com', '+743829724874', 'Test message', 0, '2018-09-17 08:11:34', '2018-09-17 08:11:34'),
(13, 'Alex', 'alex@gmail.com', '+389320482399', 'HEllo!', 0, '2018-09-17 08:55:42', '2018-09-17 08:55:42'),
(14, 'Alex', 'alex@gmail.com', '+326748236477', 'Hello!', 0, '2018-09-17 08:57:44', '2018-09-17 08:57:44'),
(15, 'Alex', 'alex@gmail.com', '+64783264766', 'wekjflkwejflkjwelkfjlwe', 0, '2018-09-17 08:58:42', '2018-09-17 08:58:42'),
(16, 'alex', 'alex@gmail.com', '+73248973289', 'lkqjeflkwejklf', 0, '2018-09-17 08:59:46', '2018-09-17 08:59:46'),
(17, 'Alex', 'alex@gmail.com', '+374289327478', 'klfjwelkflkwejlkfwe', 0, '2018-09-17 09:04:12', '2018-09-17 09:04:12'),
(18, 'Alex', 'alex@gmail.com', '+67438372864', 'welkfwef;lkwe;l', 0, '2018-09-17 09:09:01', '2018-09-17 09:09:01'),
(19, 'Alex', 'alex@gmail.com', '+67438372864', 'welkfwef;lkwe;l', 0, '2018-09-17 09:09:11', '2018-09-17 09:09:11');

-- --------------------------------------------------------

--
-- Структура таблицы `langs`
--

DROP TABLE IF EXISTS `langs`;
CREATE TABLE IF NOT EXISTS `langs` (
  `languageID` tinyint(4) NOT NULL AUTO_INCREMENT,
  `languageTitle` varchar(255) NOT NULL,
  `languageImage` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`languageID`),
  UNIQUE KEY `languageTitle` (`languageTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `langs`
--

INSERT INTO `langs` (`languageID`, `languageTitle`, `languageImage`) VALUES
(1, 'RU', 'images/langs/1/1012332_fg_russi.gif'),
(2, 'EN', 'images/langs/2/flag_usa-kupit-kiev-max-500.gif'),
(3, 'UK', 'images/langs/3/english-flag.png');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `newsID` int(11) NOT NULL AUTO_INCREMENT,
  `newsTitle` varchar(255) NOT NULL,
  `newsText` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`newsID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`newsID`, `newsTitle`, `newsText`, `createdAt`, `updatedAt`) VALUES
(7, 'Новость 1', 'фуалодцйруарцулодралодцурлоарцулоралодцурадлоцруло', '2018-09-06 07:29:22', '2018-09-06 07:29:22'),
(8, 'Новость 3', 'Lorem ipsum', '2018-09-10 07:07:42', '2018-09-10 07:07:42'),
(9, 'Test', 'Lorem', '2018-09-13 07:25:51', '2018-09-13 07:25:51');

-- --------------------------------------------------------

--
-- Структура таблицы `newsimages`
--

DROP TABLE IF EXISTS `newsimages`;
CREATE TABLE IF NOT EXISTS `newsimages` (
  `imageID` int(11) NOT NULL AUTO_INCREMENT,
  `newsID` int(11) NOT NULL,
  `imagePath` varchar(1500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageID`),
  KEY `newsID` (`newsID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `newsimages`
--

INSERT INTO `newsimages` (`imageID`, `newsID`, `imagePath`, `createdAt`, `updatedAt`) VALUES
(6, 7, '/admin/images/news/7/year.jpg', '2018-09-06 07:29:22', '2018-09-06 07:29:35'),
(7, 8, '/admin/images/news/8/year.jpg', '2018-09-10 07:07:43', '2018-09-10 07:07:43'),
(8, 9, '/admin/images/news/9/year.jpg', '2018-09-13 07:25:51', '2018-09-13 07:25:51');

-- --------------------------------------------------------

--
-- Структура таблицы `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `productPrice` int(11) NOT NULL,
  `productAmount` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `OrderDetails_productID_orderID_unique` (`orderID`,`productID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `orderAdress` varchar(1000) NOT NULL,
  `orderMessage` varchar(1000) DEFAULT NULL,
  `orderDate` datetime NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `totalPriceWithPromo` int(11) DEFAULT NULL,
  `numberCard` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `promoID` int(11) DEFAULT NULL,
  `statusID` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `userID` (`userID`),
  KEY `promoID` (`promoID`),
  KEY `statusID` (`statusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `pattributes`
--

DROP TABLE IF EXISTS `pattributes`;
CREATE TABLE IF NOT EXISTS `pattributes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `attributeValue` varchar(255) NOT NULL,
  `productID` int(11) DEFAULT NULL,
  `attributeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `pAttributes_attributeID_productID_unique` (`productID`,`attributeID`),
  KEY `attributeID` (`attributeID`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pattributes`
--

INSERT INTO `pattributes` (`ID`, `attributeValue`, `productID`, `attributeID`) VALUES
(70, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sem at tortor auctor dignissim eget non magna. Duis vestibulum ornare diam a pharetra.', 3, 1),
(71, '1000 г.', 3, 2),
(72, '500 г.', 3, 3),
(73, '1000 г.', 4, 2),
(74, '500 г.', 4, 3),
(75, 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est ', 6, 1),
(76, '1200 г.', 6, 2),
(77, '600 г.', 6, 3),
(78, 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est ', 8, 1),
(79, '1200 г.', 8, 2),
(80, '600 г.', 8, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `pcategories`
--

DROP TABLE IF EXISTS `pcategories`;
CREATE TABLE IF NOT EXISTS `pcategories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` int(11) DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `pCategories_categoryID_productID_unique` (`productID`,`categoryID`),
  KEY `categoryID` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pcategories`
--

INSERT INTO `pcategories` (`ID`, `productID`, `categoryID`) VALUES
(57, 3, 2),
(58, 3, 3),
(59, 4, 3),
(60, 4, 5),
(61, 6, 2),
(62, 6, 3),
(63, 6, 4),
(64, 6, 5),
(65, 8, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `pimages`
--

DROP TABLE IF EXISTS `pimages`;
CREATE TABLE IF NOT EXISTS `pimages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` int(11) NOT NULL,
  `imagePath` varchar(1500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pimages`
--

INSERT INTO `pimages` (`ID`, `productID`, `imagePath`, `createdAt`, `updatedAt`) VALUES
(12, 3, '/admin/images/3/vitamin1.jpg', '2018-09-17 06:32:07', '2018-09-17 06:32:07'),
(13, 4, '/admin/images/4/vitamin1.jpg', '2018-09-17 07:05:52', '2018-09-17 07:05:52'),
(14, 6, '/admin/images/6/vitamin1.jpg', '2018-09-17 07:07:00', '2018-09-17 07:07:00'),
(15, 8, '/admin/images/8/vitamin1.jpg', '2018-09-17 07:07:22', '2018-09-17 07:07:22');

-- --------------------------------------------------------

--
-- Структура таблицы `productcategories`
--

DROP TABLE IF EXISTS `productcategories`;
CREATE TABLE IF NOT EXISTS `productcategories` (
  `categoryID` int(11) NOT NULL AUTO_INCREMENT,
  `categoryTitle` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `productcategories`
--

INSERT INTO `productcategories` (`categoryID`, `categoryTitle`) VALUES
(2, 'Мужские'),
(3, 'Женские'),
(4, 'Спортивные'),
(5, 'Детские');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `productTitle` varchar(255) NOT NULL,
  `productDescription` varchar(1500) NOT NULL,
  `productPrice` double NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`productID`, `productTitle`, `productDescription`, `productPrice`, `created`, `updated`) VALUES
(3, 'Спортивный витамин', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sem at tortor auctor dignissim eget non magna. Duis vestibulum ornare diam a pharetra. Maecenas eu eros eget urna dapibus faucibus. Aenean fermentum augue non ligula aliquet lacinia. Etiam ligula velit, vulputate id pulvinar sit amet, imperdiet at erat. Morbi faucibus elementum gravida. Etiam cursus lacus sed arcu placerat tempus. Proin ut dui sit amet augue ornare sagittis vel at urna.', 400, '2018-09-07 06:37:19', '2018-09-17 06:32:07'),
(4, 'Витамин 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.', 400, '2018-09-10 08:58:40', '2018-09-17 07:05:52'),
(6, 'Витамин 2', 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est euismod. Nullam eros enim, varius sit amet tristique vitae, porta quis mauris', 450, '2018-09-14 07:06:33', '2018-09-17 07:07:00'),
(8, 'Витамин 4', 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est euismod. Nullam eros enim, varius sit amet tristique vitae, porta quis mauris', 200, '2018-09-14 07:58:13', '2018-09-17 07:07:22');

-- --------------------------------------------------------

--
-- Структура таблицы `promocodes`
--

DROP TABLE IF EXISTS `promocodes`;
CREATE TABLE IF NOT EXISTS `promocodes` (
  `promoCodeID` int(11) NOT NULL AUTO_INCREMENT,
  `discountCode` varchar(255) NOT NULL,
  `discount` tinyint(4) NOT NULL,
  `promoCount` int(11) NOT NULL,
  `startAtDate` date DEFAULT NULL,
  `expireAtDate` date DEFAULT NULL,
  PRIMARY KEY (`promoCodeID`),
  UNIQUE KEY `discountCode` (`discountCode`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `promocodes`
--

INSERT INTO `promocodes` (`promoCodeID`, `discountCode`, `discount`, `promoCount`, `startAtDate`, `expireAtDate`) VALUES
(2, 'FF-12', 99, 100, '2018-09-14', '2018-09-28');

-- --------------------------------------------------------

--
-- Структура таблицы `statusorders`
--

DROP TABLE IF EXISTS `statusorders`;
CREATE TABLE IF NOT EXISTS `statusorders` (
  `statusID` int(11) NOT NULL AUTO_INCREMENT,
  `statusTitle` varchar(50) NOT NULL,
  PRIMARY KEY (`statusID`),
  UNIQUE KEY `statusTitle` (`statusTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `statusorders`
--

INSERT INTO `statusorders` (`statusID`, `statusTitle`) VALUES
(2, 'В обработке'),
(1, 'Новый');

-- --------------------------------------------------------

--
-- Структура таблицы `translations`
--

DROP TABLE IF EXISTS `translations`;
CREATE TABLE IF NOT EXISTS `translations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `translation` varchar(255) NOT NULL,
  `constantID` int(11) DEFAULT NULL,
  `languageID` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `translations_languageID_constantID_unique` (`constantID`,`languageID`),
  KEY `languageID` (`languageID`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `translations`
--

INSERT INTO `translations` (`ID`, `translation`, `constantID`, `languageID`) VALUES
(5, 'Blog', 7, 2),
(8, 'Home', 8, 2),
(9, 'Home', 8, 3),
(10, 'Главная', 9, 1),
(11, 'Товары', 11, 1),
(12, 'Блог', 12, 1),
(13, 'О компании', 13, 1),
(14, 'Контакты', 14, 1),
(15, 'Мужские', 15, 1),
(16, 'Женские', 16, 1),
(17, 'Детские', 17, 1),
(18, 'Спортивные', 18, 1),
(19, 'Каталог', 19, 1),
(20, 'Еще', 20, 1),
(21, 'Новости', 21, 1),
(22, 'Свяжитесь с нами', 22, 1),
(23, 'Ваше имя', 23, 1),
(24, 'Контактный email', 24, 1),
(25, 'Контактный телефон', 25, 1),
(26, 'ОТПРАВИТЬ', 26, 1),
(27, 'УЖЕ В КОРЗИНЕ', 27, 1),
(28, 'В КОРЗИНУ', 28, 1),
(29, 'Описание', 29, 1),
(30, 'Состав', 30, 1),
(31, 'Информация о продукте', 31, 1),
(32, 'Корзина', 32, 1),
(33, 'Офрмить заказ', 33, 1),
(34, 'Итого', 34, 1),
(35, 'Корзина пустая', 35, 1),
(36, 'Персональные данные', 36, 1),
(37, 'Содержание заказа', 37, 1),
(38, 'Подтвердить заказ', 38, 1),
(39, 'Введите промокод', 39, 1),
(40, 'Вы не ввели или указали неверный промокод', 40, 1),
(41, 'Доставка', 41, 1),
(42, '*Имя должно начинатся с большой буквы и содержать буквы одного алфавита', 42, 1),
(43, '*Введен некорректный email!', 43, 1),
(44, '*Введен некорректный телефон!', 44, 1),
(45, 'Адресс доставки', 45, 1),
(46, 'Закрыть', 46, 1),
(47, 'Close', 46, 2),
(48, 'Close', 46, 3),
(49, 'Home', 9, 2),
(50, 'Products', 11, 2),
(51, 'Blog', 12, 2),
(52, 'About', 13, 2),
(53, 'Contacts', 14, 2),
(54, 'Man', 15, 2),
(55, 'Woman', 16, 2),
(56, 'Children', 17, 2),
(57, 'Sport', 18, 2),
(58, 'Catalog', 19, 2),
(59, 'More', 20, 2),
(60, 'News', 21, 2),
(61, 'Contact us', 22, 2),
(62, 'You name', 23, 2),
(63, 'Contact email', 24, 2),
(64, 'Contact phone', 25, 2),
(65, 'SEND', 26, 2),
(66, 'IN BASKET', 27, 2),
(67, 'ADD BASKET', 28, 2),
(68, 'Description', 29, 2),
(69, 'Composition', 30, 2),
(70, 'Information about product', 31, 2),
(71, 'Basket', 32, 2),
(72, 'Checkout', 33, 2),
(73, 'Total', 34, 2),
(74, 'Basket is empty', 35, 2),
(75, 'Personal information', 36, 2),
(76, 'Order content', 37, 2),
(77, 'Order confirm', 38, 2),
(78, 'Input promocode', 39, 2),
(79, 'You did not enter or entered the wrong promotional code', 40, 2),
(80, 'Delivery', 41, 2),
(81, '* The name must begin with a capital letter and contain the letters of the same alphabet', 42, 2),
(82, '* Incorrect email!', 43, 2),
(83, '* Incorrect phone !', 44, 2),
(84, 'Delivery address', 45, 2),
(85, 'Home', 9, 3),
(86, 'Products', 11, 3),
(87, 'Blog', 12, 3),
(88, 'About', 13, 3),
(89, 'Contacts', 14, 3),
(90, 'Man', 15, 3),
(91, 'Woman', 16, 3),
(92, 'Children', 17, 3),
(93, 'Sport', 18, 3),
(94, 'Catalog', 19, 3),
(95, 'More', 20, 3),
(96, 'News', 21, 3),
(97, 'Contact us', 22, 3),
(98, 'You name', 23, 3),
(99, 'Contact email', 24, 3),
(100, 'Contact phone', 25, 3),
(101, 'SEND', 26, 3),
(102, 'IN BASKET', 27, 3),
(103, 'ADD BASKET', 28, 3),
(104, 'Description', 29, 3),
(105, 'Composition', 30, 3),
(106, 'Information about product', 31, 3),
(107, 'Basket', 32, 3),
(108, 'Checkout', 33, 3),
(109, 'Total', 34, 3),
(110, 'Basket is empty', 35, 3),
(111, 'Personal information', 36, 3),
(112, 'Order content', 37, 3),
(113, 'Order confirm', 38, 3),
(114, 'Input promocode', 39, 3),
(115, 'You did not enter or entered the wrong promotional code', 40, 3),
(116, 'Delivery', 41, 3),
(117, '* The name must begin with a capital letter and contain the letters of the same alphabet', 42, 3),
(118, '* Incorrect email!', 43, 3),
(119, '* Incorrect phone !', 44, 3),
(120, 'Delivery address', 45, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `userandcards`
--

DROP TABLE IF EXISTS `userandcards`;
CREATE TABLE IF NOT EXISTS `userandcards` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `cardID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UserAndCards_cardID_userID_unique` (`userID`,`cardID`),
  KEY `cardID` (`cardID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `userandcards`
--

INSERT INTO `userandcards` (`ID`, `userID`, `cardID`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userPhone` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userEmail` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`userID`, `userEmail`, `userName`, `userPhone`) VALUES
(1, 'olgascorpions@gmail.com', 'Оля', '+38(050)-258-56-58');

-- --------------------------------------------------------

--
-- Структура таблицы `wordsconstants`
--

DROP TABLE IF EXISTS `wordsconstants`;
CREATE TABLE IF NOT EXISTS `wordsconstants` (
  `constantID` int(11) NOT NULL AUTO_INCREMENT,
  `constantTitle` varchar(255) NOT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`constantID`),
  UNIQUE KEY `constantTitle` (`constantTitle`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `wordsconstants`
--

INSERT INTO `wordsconstants` (`constantID`, `constantTitle`, `description`) VALUES
(7, 'Новостная лента', 'LAYOUT_BLOG'),
(8, 'LAYOUT_MAIN', 'Главная страница'),
(9, 'LAYOUT_MAIN_LINK', ''),
(11, 'LAYOUT_PRODUCTS_LINK', ''),
(12, 'LAYOUT_BLOG_LINK', ''),
(13, 'LAYOUT_ABOUT_LINK', ''),
(14, 'LAYOUT_CONTACTS_LINK', ''),
(15, 'LAYOUT_CATEGORY_MAN_LINK', ''),
(16, 'LAYOUT_CATEGORY_WOMAN_LINK', ''),
(17, 'LAYOUT_CATEGORY_CHILDREN_LINK', ''),
(18, 'LAYOUT_CATEGORY_SPORT_LINK', ''),
(19, 'LAYOUT_CATALOG_LINK', ''),
(20, 'LAYOUT_MORE_LINK', ''),
(21, 'LAYOUT_NEWS_LINK', ''),
(22, 'LAYOUT_CONTACT_US_LINK', ''),
(23, 'LAYOUT_YOU_NAME_LINK', ''),
(24, 'LAYOUT_CONTACT_EMAIL_LINK', ''),
(25, 'LAYOUT_CONTACT_PHONE_LINK', ''),
(26, 'LAYOUT_SEND_LINK', ''),
(27, 'LAYOUT_IN_BASKET', ''),
(28, 'LAYOUT_ADD_BASKET', ''),
(29, 'LAYOUT_DESCRIPTION', ''),
(30, 'LAYOUT_COMPOSITION', ''),
(31, 'LAYOUT_INFO', ''),
(32, 'LAYOUT_CART', ''),
(33, 'LAYOUT_CHECKOUT', ''),
(34, 'LAYOUT_TOTAL', ''),
(35, 'LAYOUT_BASKET_EMPTY', ''),
(36, 'LAYOUT_PERSONAL_INFORMATION', ''),
(37, 'LAYOUT_ORDER_CONTENT', ''),
(38, 'LAYOUT_ORDER_CONFIRM', ''),
(39, 'LAYOUT_INPUT_PROMO', ''),
(40, 'LAYOUT_INCORRECT_PROMO', ''),
(41, 'LAYOUT_DELIVERY', ''),
(42, 'LAYOUT_INCORRECT_NAME', ''),
(43, 'LAYOUT_INCORRECT_MAIL', ''),
(44, 'LAYOUT_INCORRECT_PHONE', ''),
(45, 'LAYOUT_ADRESS', ''),
(46, 'LAYOUT_CLOSE', 'Закрыть');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `newsimages`
--
ALTER TABLE `newsimages`
  ADD CONSTRAINT `newsimages_ibfk_1` FOREIGN KEY (`newsID`) REFERENCES `news` (`newsID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`promoID`) REFERENCES `promocodes` (`promoCodeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`statusID`) REFERENCES `statusorders` (`statusID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `pattributes`
--
ALTER TABLE `pattributes`
  ADD CONSTRAINT `pattributes_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pattributes_ibfk_2` FOREIGN KEY (`attributeID`) REFERENCES `attributes` (`attributeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `pcategories`
--
ALTER TABLE `pcategories`
  ADD CONSTRAINT `pcategories_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pcategories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `productcategories` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `pimages`
--
ALTER TABLE `pimages`
  ADD CONSTRAINT `pimages_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `translations`
--
ALTER TABLE `translations`
  ADD CONSTRAINT `translations_ibfk_1` FOREIGN KEY (`constantID`) REFERENCES `wordsconstants` (`constantID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `translations_ibfk_2` FOREIGN KEY (`languageID`) REFERENCES `langs` (`languageID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `userandcards`
--
ALTER TABLE `userandcards`
  ADD CONSTRAINT `userandcards_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userandcards_ibfk_2` FOREIGN KEY (`cardID`) REFERENCES `cards` (`cardID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
