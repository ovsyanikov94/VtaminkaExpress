-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 14 2018 г., 08:38
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`feedBackID`, `fUserName`, `fUserEmail`, `fUserPhone`, `fMessage`, `fProcessed`, `created`, `updated`) VALUES
(1, 'Alex', 'alex@mail.ru', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:05:07', '2018-09-06 08:05:50'),
(2, 'Alex', 'alex@mail.ru', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:06:23', '2018-09-06 08:07:03'),
(3, 'Alex', 'ovsyanikov@gmail.com', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:16:45', '2018-09-06 08:17:27'),
(4, 'Alex', 'ovsyanikov@itstep.org', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:18:05', '2018-09-06 08:18:13'),
(5, 'Alex', 'ovsyanikov@itstep.org', '+380991234567', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.Aenean nec ultricies enim. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Duis vitae mauris erat.', 1, '2018-09-06 08:23:06', '2018-09-06 08:23:13');

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
(6, 7, 'images/news/7/year.jpg', '2018-09-06 07:29:22', '2018-09-06 07:29:35'),
(7, 8, 'images/news/8/banner.png', '2018-09-10 07:07:43', '2018-09-10 07:07:43'),
(8, 9, 'images/news/9/1.png', '2018-09-13 07:25:51', '2018-09-13 07:25:51');

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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pattributes`
--

INSERT INTO `pattributes` (`ID`, `attributeValue`, `productID`, `attributeID`) VALUES
(56, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sem at tortor auctor dignissim eget non magna. Duis vestibulum ornare diam a pharetra.', 3, 1),
(57, '1000 г.', 3, 2),
(58, '500 г.', 3, 3),
(59, '1000 г.', 4, 2),
(60, '500 г.', 4, 3),
(61, 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est ', 6, 1),
(62, '1200 г.', 6, 2),
(63, '600 г.', 6, 3),
(67, 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est ', 8, 1),
(68, '1200 г.', 8, 2),
(69, '600 г.', 8, 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pcategories`
--

INSERT INTO `pcategories` (`ID`, `productID`, `categoryID`) VALUES
(47, 3, 2),
(48, 3, 3),
(49, 4, 3),
(50, 4, 5),
(51, 6, 2),
(52, 6, 3),
(53, 6, 4),
(54, 6, 5),
(56, 8, 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pimages`
--

INSERT INTO `pimages` (`ID`, `productID`, `imagePath`, `createdAt`, `updatedAt`) VALUES
(8, 3, 'images/3/year.jpg', '2018-09-07 06:37:19', '2018-09-07 06:37:19'),
(9, 4, 'images/4/vitamin1.jpg', '2018-09-10 08:58:40', '2018-09-10 08:58:40'),
(11, 8, 'images/8/vitamin1.jpg', '2018-09-14 07:58:13', '2018-09-14 07:58:13');

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
(3, 'Спортивный витамин', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sem at tortor auctor dignissim eget non magna. Duis vestibulum ornare diam a pharetra. Maecenas eu eros eget urna dapibus faucibus. Aenean fermentum augue non ligula aliquet lacinia. Etiam ligula velit, vulputate id pulvinar sit amet, imperdiet at erat. Morbi faucibus elementum gravida. Etiam cursus lacus sed arcu placerat tempus. Proin ut dui sit amet augue ornare sagittis vel at urna.', 400, '2018-09-07 06:37:19', '2018-09-07 06:37:19'),
(4, 'Витамин 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis erat sit amet enim auctor feugiat. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis. Aenean nec ultricies enim. Vestibulum ut viverra orci. Maecenas suscipit odio quis felis varius mollis.', 400, '2018-09-10 08:58:40', '2018-09-10 08:58:40'),
(6, 'Витамин 2', 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est euismod. Nullam eros enim, varius sit amet tristique vitae, porta quis mauris', 450, '2018-09-14 07:06:33', '2018-09-14 07:06:33'),
(8, 'Витамин 4', 'Vivamus scelerisque a metus ac varius. Aliquam facilisis malesuada libero. Donec porta mi quis eros consectetur, at fermentum est euismod. Nullam eros enim, varius sit amet tristique vitae, porta quis mauris', 200, '2018-09-14 07:58:13', '2018-09-14 07:58:13');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `translations`
--

INSERT INTO `translations` (`ID`, `translation`, `constantID`, `languageID`) VALUES
(4, 'Блог', 7, 1),
(5, 'Blog', 7, 2),
(6, 'Blog', 7, 3),
(7, 'Главная', 8, 1),
(8, 'Home', 8, 2),
(9, 'Home', 8, 3);

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
  UNIQUE KEY `constantTitle` (`constantTitle`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `wordsconstants`
--

INSERT INTO `wordsconstants` (`constantID`, `constantTitle`, `description`) VALUES
(7, 'Новостная лента', 'LAYOUT_BLOG'),
(8, 'LAYOUT_MAIN', 'Главная страница');

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
