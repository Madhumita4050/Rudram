-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: rudran_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fatherHusbandName` varchar(255) NOT NULL,
  `village` varchar(255) DEFAULT NULL,
  `post` varchar(255) DEFAULT NULL,
  `block` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pinCode` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `education` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `paymentStatus` enum('Pending','Completed','Failed') DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (1,'Personal Assistance','varsha srivastava','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','226076','09506944887','srivastavavarsha1234@gmail.com','MCA','uploads\\1786693524288-Screenshot 2026-08-13 165320.png','Completed','2026-08-14 07:45:24','2026-08-14 07:45:28',NULL,NULL,NULL),(3,'Personal Assistance','varsha ','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','221391','09506944887','srivastavavarsha1234@gmail.com','MCA','uploads\\1786694668623-Screenshot 2026-08-11 100254.png','Completed','2026-08-14 08:04:28','2026-08-14 08:04:36',NULL,NULL,NULL),(4,'Personal Assistance','sana','Ram','GOA','mau','mau','bihar','bihar','221302','09506944876','sana@123gmail.com','MCA','uploads\\1786694901739-Screenshot 2026-08-13 165320.png','Completed','2026-08-14 08:08:21','2026-08-14 08:08:27',NULL,NULL,NULL),(5,'Personal Assistance','sana','Ram','GOA','mau','mau','bihar','bihar','221306','09506944876','sana@123gmail.com','MCA','uploads\\1786695227938-Screenshot 2026-08-13 165320.png','Pending','2026-08-14 08:13:47','2026-08-14 08:13:47',NULL,NULL,NULL),(6,'Field Officer','varsha ','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','221302','09506944887','srivastavavarsha1234@gmail.com','MCA','uploads\\1787042960243-file_0000000019e081faaca37a3b0fd2391f.png','Pending','2026-08-18 08:49:20','2026-08-18 08:49:20',NULL,NULL,NULL),(7,'Personal Assistance','varsha srivastava','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','2233461','09506944887','varshasrivastava630@gmail.com','MCA','uploads\\1787043210245-file_0000000019e081faaca37a3b0fd2391f.png','Completed','2026-08-18 08:53:30','2026-08-18 08:53:37',NULL,NULL,NULL),(8,'Founder Member','varsha srivastava','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','221302','09506944887','varshasrivastava630@gmail.com','MCA','uploads\\1787043873298-file_0000000019e081faaca37a3b0fd2391f.png','Completed','2026-08-18 09:04:33','2026-08-18 09:04:39',NULL,NULL,NULL),(9,'Personal Assistance','varsha srivastava','JOHN','GOA','AURAI','AURAI','Lucknow','Uttar Pradesh','221302','09506944887','varshasrivastava630@gmail.com','MCA','uploads\\1787044029256-file_0000000019e081faaca37a3b0fd2391f.png','Pending','2026-08-18 09:07:09','2026-08-18 09:07:09',NULL,NULL,NULL),(10,'Founder Member','varsha','john','aurai','aurai','aurai','varansi','uttart pradesh','221307','633246462','john@123gmail.com','mca','uploads\\1788584153015-Screenshot 2026-09-04 161216.png','Pending','2026-09-05 04:55:53','2026-09-05 04:55:53',NULL,NULL,NULL);
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requesthistories`
--

DROP TABLE IF EXISTS `requesthistories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requesthistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refId` varchar(255) NOT NULL,
  `amount` float DEFAULT 0,
  `status` varchar(255) DEFAULT 'Pending',
  `mode` varchar(255) DEFAULT 'Online',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `serviceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refId` (`refId`),
  UNIQUE KEY `refId_2` (`refId`),
  UNIQUE KEY `refId_3` (`refId`),
  UNIQUE KEY `refId_4` (`refId`),
  UNIQUE KEY `refId_5` (`refId`),
  UNIQUE KEY `refId_6` (`refId`),
  UNIQUE KEY `refId_7` (`refId`),
  UNIQUE KEY `refId_8` (`refId`),
  UNIQUE KEY `refId_9` (`refId`),
  UNIQUE KEY `refId_10` (`refId`),
  UNIQUE KEY `refId_11` (`refId`),
  KEY `userId` (`userId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `requesthistories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_10` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_12` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_14` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_16` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_17` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_18` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_20` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_21` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_22` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_4` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_6` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_8` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `requesthistories_ibfk_9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requesthistories`
--

LOCK TABLES `requesthistories` WRITE;
/*!40000 ALTER TABLE `requesthistories` DISABLE KEYS */;
/*!40000 ALTER TABLE `requesthistories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` float DEFAULT 0,
  `icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Mobile Recharge','Instant mobile recharge','Recharge',0,'Smartphone','2026-08-13 11:04:50','2026-08-13 11:04:50'),(2,'DTH Recharge','Recharge your DTH','Recharge',0,'Tv','2026-08-13 11:04:50','2026-08-13 11:04:50'),(3,'Electricity Bill','Pay electricity bills','Utility',0,'Zap','2026-08-13 11:04:50','2026-08-13 11:04:50'),(4,'Water Bill','Pay water bills','Utility',0,'Droplet','2026-08-13 11:04:50','2026-08-13 11:04:50'),(5,'Credit Card Bill','Pay CC bills','Finance',0,'CreditCard','2026-08-13 11:04:50','2026-08-13 11:04:50'),(6,'Flight Booking','Book flights','Travel',0,'Plane','2026-08-13 11:04:50','2026-08-13 11:04:50');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john','john123@gmail.com','$2b$10$fsRKwQPw2iKEiauU6UKpXuGgQXjCGIzL6nfD20EMwYPdq4Tm4olEu','2026-08-13 11:18:27','2026-08-13 11:18:27'),(2,'Test User','test1@example.com','$2b$10$.wCMI6mfWIOq6nKjvag2re5kNVhhkPWqcEbleB9KUQVI84Yb319Tm','2026-08-14 07:22:21','2026-08-14 07:22:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-05 10:43:31
