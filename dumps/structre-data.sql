-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: django-react
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add post',1,'add_post'),(2,'Can change post',1,'change_post'),(3,'Can delete post',1,'delete_post'),(4,'Can view post',1,'view_post'),(5,'Can add post replies',2,'add_postreplies'),(6,'Can change post replies',2,'change_postreplies'),(7,'Can delete post replies',2,'delete_postreplies'),(8,'Can view post replies',2,'view_postreplies'),(9,'Can add friends',3,'add_friends'),(10,'Can change friends',3,'change_friends'),(11,'Can delete friends',3,'delete_friends'),(12,'Can view friends',3,'view_friends'),(13,'Can add log entry',4,'add_logentry'),(14,'Can change log entry',4,'change_logentry'),(15,'Can delete log entry',4,'delete_logentry'),(16,'Can view log entry',4,'view_logentry'),(17,'Can add permission',5,'add_permission'),(18,'Can change permission',5,'change_permission'),(19,'Can delete permission',5,'delete_permission'),(20,'Can view permission',5,'view_permission'),(21,'Can add group',6,'add_group'),(22,'Can change group',6,'change_group'),(23,'Can delete group',6,'delete_group'),(24,'Can view group',6,'view_group'),(25,'Can add content type',7,'add_contenttype'),(26,'Can change content type',7,'change_contenttype'),(27,'Can delete content type',7,'delete_contenttype'),(28,'Can view content type',7,'view_contenttype'),(29,'Can add session',8,'add_session'),(30,'Can change session',8,'change_session'),(31,'Can delete session',8,'delete_session'),(32,'Can view session',8,'view_session'),(33,'Can add user',9,'add_users'),(34,'Can change user',9,'change_users'),(35,'Can delete user',9,'delete_users'),(36,'Can view user',9,'view_users'),(37,'Can add rol',10,'add_rol'),(38,'Can change rol',10,'change_rol'),(39,'Can delete rol',10,'delete_rol'),(40,'Can view rol',10,'view_rol'),(41,'Can add grade',11,'add_grade'),(42,'Can change grade',11,'change_grade'),(43,'Can delete grade',11,'delete_grade'),(44,'Can view grade',11,'view_grade'),(45,'Can add institutions',12,'add_institutions'),(46,'Can change institutions',12,'change_institutions'),(47,'Can delete institutions',12,'delete_institutions'),(48,'Can view institutions',12,'view_institutions'),(49,'Can add student',13,'add_student'),(50,'Can change student',13,'change_student'),(51,'Can delete student',13,'delete_student'),(52,'Can view student',13,'view_student'),(53,'Can add expedient',14,'add_expedient'),(54,'Can change expedient',14,'change_expedient'),(55,'Can delete expedient',14,'delete_expedient'),(56,'Can view expedient',14,'view_expedient'),(57,'Can add pacientfiles',15,'add_pacientfiles'),(58,'Can change pacientfiles',15,'change_pacientfiles'),(59,'Can delete pacientfiles',15,'delete_pacientfiles'),(60,'Can view pacientfiles',15,'view_pacientfiles'),(61,'Can add psychologist',16,'add_psychologist'),(62,'Can change psychologist',16,'change_psychologist'),(63,'Can delete psychologist',16,'delete_psychologist'),(64,'Can view psychologist',16,'view_psychologist'),(65,'Can add session',17,'add_session'),(66,'Can change session',17,'change_session'),(67,'Can delete session',17,'delete_session'),(68,'Can view session',17,'view_session'),(69,'Can add observations',18,'add_observations'),(70,'Can change observations',18,'change_observations'),(71,'Can delete observations',18,'delete_observations'),(72,'Can view observations',18,'view_observations'),(73,'Can add ticket',19,'add_ticket'),(74,'Can change ticket',19,'change_ticket'),(75,'Can delete ticket',19,'delete_ticket'),(76,'Can view ticket',19,'view_ticket'),(77,'Can add book',20,'add_book'),(78,'Can change book',20,'change_book'),(79,'Can delete book',20,'delete_book'),(80,'Can view book',20,'view_book');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_users_id_user` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_users_id_user` FOREIGN KEY (`user_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (4,'admin','logentry'),(6,'auth','group'),(5,'auth','permission'),(7,'contenttypes','contenttype'),(11,'grade','grade'),(12,'instituto','institutions'),(20,'library','book'),(3,'post','friends'),(1,'post','post'),(2,'post','postreplies'),(14,'psychologist','expedient'),(18,'psychologist','observations'),(15,'psychologist','pacientfiles'),(16,'psychologist','psychologist'),(17,'psychologist','session'),(19,'psychologist','ticket'),(10,'rol','rol'),(8,'sessions','session'),(13,'student','student'),(9,'user','users');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'rol','0001_initial','2024-11-08 18:22:28.231295'),(2,'contenttypes','0001_initial','2024-11-08 18:22:28.268268'),(3,'contenttypes','0002_remove_content_type_name','2024-11-08 18:22:28.311563'),(4,'auth','0001_initial','2024-11-08 18:22:28.500978'),(5,'auth','0002_alter_permission_name_max_length','2024-11-08 18:22:28.543769'),(6,'auth','0003_alter_user_email_max_length','2024-11-08 18:22:28.550912'),(7,'auth','0004_alter_user_username_opts','2024-11-08 18:22:28.556227'),(8,'auth','0005_alter_user_last_login_null','2024-11-08 18:22:28.562012'),(9,'auth','0006_require_contenttypes_0002','2024-11-08 18:22:28.564626'),(10,'auth','0007_alter_validators_add_error_messages','2024-11-08 18:22:28.570895'),(11,'auth','0008_alter_user_username_max_length','2024-11-08 18:22:28.576608'),(12,'auth','0009_alter_user_last_name_max_length','2024-11-08 18:22:28.582542'),(13,'auth','0010_alter_group_name_max_length','2024-11-08 18:22:28.597057'),(14,'auth','0011_update_proxy_permissions','2024-11-08 18:22:28.603313'),(15,'auth','0012_alter_user_first_name_max_length','2024-11-08 18:22:28.616196'),(16,'user','0001_initial','2024-11-08 18:22:28.891763'),(17,'admin','0001_initial','2024-11-08 18:22:28.994296'),(18,'admin','0002_logentry_remove_auto_add','2024-11-08 18:22:29.003854'),(19,'admin','0003_logentry_add_action_flag_choices','2024-11-08 18:22:29.012391'),(20,'grade','0001_initial','2024-11-08 18:22:29.030112'),(21,'instituto','0001_initial','2024-11-08 18:22:29.046559'),(22,'library','0001_initial','2024-11-08 18:22:29.111067'),(23,'post','0001_initial','2024-11-08 18:22:29.377584'),(24,'psychologist','0001_initial','2024-11-08 18:22:29.790160'),(25,'sessions','0001_initial','2024-11-08 18:22:29.818263'),(26,'student','0001_initial','2024-11-08 18:22:30.022669');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;

--
-- Table structure for table `grade_grade`
--

DROP TABLE IF EXISTS `grade_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_grade` (
  `id_grade` int NOT NULL,
  `grade_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_grade`
--

/*!40000 ALTER TABLE `grade_grade` DISABLE KEYS */;
INSERT INTO `grade_grade` VALUES (7,'setimo'),(8,'octavo'),(9,'noveno'),(10,'decimo'),(11,'undecimo'),(12,'duodecimo');
/*!40000 ALTER TABLE `grade_grade` ENABLE KEYS */;

--
-- Table structure for table `instituto_institutions`
--

DROP TABLE IF EXISTS `instituto_institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instituto_institutions` (
  `id_institution` int NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(150) NOT NULL,
  `public_institution` tinyint(1) NOT NULL,
  `institution_address` varchar(200) NOT NULL,
  PRIMARY KEY (`id_institution`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituto_institutions`
--

/*!40000 ALTER TABLE `instituto_institutions` DISABLE KEYS */;
INSERT INTO `instituto_institutions` VALUES (1,'Colegio Metodista',0,'San José, Costa Rica'),(2,'Colegio Lincoln S',1,'Santo Domingo, Heredia, Costa Rica'),(3,'Saint Francis',0,'Moravia, San José, Costa Rica'),(4,'Colegio el Ingenio',1,'Guanacaste, Costa Rica');
/*!40000 ALTER TABLE `instituto_institutions` ENABLE KEYS */;

--
-- Table structure for table `library_book`
--

DROP TABLE IF EXISTS `library_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_book` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `added_date` datetime(6) NOT NULL,
  `id_admin_id` int NOT NULL,
  PRIMARY KEY (`id_book`),
  KEY `library_book_id_admin_id_5ab75fb9_fk_user_users_id_user` (`id_admin_id`),
  CONSTRAINT `library_book_id_admin_id_5ab75fb9_fk_user_users_id_user` FOREIGN KEY (`id_admin_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_book`
--

/*!40000 ALTER TABLE `library_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `library_book` ENABLE KEYS */;

--
-- Table structure for table `post_friends`
--

DROP TABLE IF EXISTS `post_friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_friends` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `friend_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_friends_user_id_friend_id_77cb97ad_uniq` (`user_id`,`friend_id`),
  KEY `post_friends_friend_id_11b0a036_fk_user_users_id_user` (`friend_id`),
  CONSTRAINT `post_friends_friend_id_11b0a036_fk_user_users_id_user` FOREIGN KEY (`friend_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `post_friends_user_id_bc41eb7a_fk_user_users_id_user` FOREIGN KEY (`user_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_friends`
--

/*!40000 ALTER TABLE `post_friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_friends` ENABLE KEYS */;

--
-- Table structure for table `post_post`
--

DROP TABLE IF EXISTS `post_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` longtext,
  `image_url` varchar(500) DEFAULT NULL,
  `creation_date` date NOT NULL,
  `comment_count` int unsigned NOT NULL,
  `modification_date` date NOT NULL,
  `id_user_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `post_post_id_user_id_b873fcdb_fk_user_users_id_user` (`id_user_id`),
  CONSTRAINT `post_post_id_user_id_b873fcdb_fk_user_users_id_user` FOREIGN KEY (`id_user_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `post_post_chk_1` CHECK ((`comment_count` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_post`
--

/*!40000 ALTER TABLE `post_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_post` ENABLE KEYS */;

--
-- Table structure for table `post_postreplies`
--

DROP TABLE IF EXISTS `post_postreplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_postreplies` (
  `replies_id` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `replies_date` date NOT NULL,
  `like_count` int NOT NULL,
  `id_user_id` int NOT NULL,
  `post_id_id` int NOT NULL,
  PRIMARY KEY (`replies_id`),
  KEY `post_postreplies_id_user_id_7120511a_fk_user_users_id_user` (`id_user_id`),
  KEY `post_postreplies_post_id_id_7126165e_fk_post_post_post_id` (`post_id_id`),
  CONSTRAINT `post_postreplies_id_user_id_7120511a_fk_user_users_id_user` FOREIGN KEY (`id_user_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `post_postreplies_post_id_id_7126165e_fk_post_post_post_id` FOREIGN KEY (`post_id_id`) REFERENCES `post_post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_postreplies`
--

/*!40000 ALTER TABLE `post_postreplies` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_postreplies` ENABLE KEYS */;

--
-- Table structure for table `psychologist_expedient`
--

DROP TABLE IF EXISTS `psychologist_expedient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_expedient` (
  `id_expedient` int NOT NULL AUTO_INCREMENT,
  `state` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `id_pacient_id` int NOT NULL,
  `id_psychologist_id` int NOT NULL,
  PRIMARY KEY (`id_expedient`),
  KEY `psychologist_expedie_id_psychologist_id_9bf705eb_fk_psycholog` (`id_psychologist_id`),
  KEY `psychologist_expedie_id_pacient_id_44b063ed_fk_user_user` (`id_pacient_id`),
  CONSTRAINT `psychologist_expedie_id_pacient_id_44b063ed_fk_user_user` FOREIGN KEY (`id_pacient_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `psychologist_expedie_id_psychologist_id_9bf705eb_fk_psycholog` FOREIGN KEY (`id_psychologist_id`) REFERENCES `psychologist_psychologist` (`id_psychologist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_expedient`
--

/*!40000 ALTER TABLE `psychologist_expedient` DISABLE KEYS */;
/*!40000 ALTER TABLE `psychologist_expedient` ENABLE KEYS */;

--
-- Table structure for table `psychologist_observations`
--

DROP TABLE IF EXISTS `psychologist_observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_observations` (
  `id_observation` int NOT NULL AUTO_INCREMENT,
  `observation_description` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `id_session_id` int NOT NULL,
  PRIMARY KEY (`id_observation`),
  UNIQUE KEY `id_session_id` (`id_session_id`),
  CONSTRAINT `psychologist_observa_id_session_id_86ca48ff_fk_psycholog` FOREIGN KEY (`id_session_id`) REFERENCES `psychologist_session` (`id_session`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_observations`
--

/*!40000 ALTER TABLE `psychologist_observations` DISABLE KEYS */;
/*!40000 ALTER TABLE `psychologist_observations` ENABLE KEYS */;

--
-- Table structure for table `psychologist_pacientfiles`
--

DROP TABLE IF EXISTS `psychologist_pacientfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_pacientfiles` (
  `id_file` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `file_name` varchar(55) NOT NULL,
  `file` varchar(100) NOT NULL,
  `id_expedient_id` int NOT NULL,
  PRIMARY KEY (`id_file`),
  KEY `psychologist_pacient_id_expedient_id_d2baa19f_fk_psycholog` (`id_expedient_id`),
  CONSTRAINT `psychologist_pacient_id_expedient_id_d2baa19f_fk_psycholog` FOREIGN KEY (`id_expedient_id`) REFERENCES `psychologist_expedient` (`id_expedient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_pacientfiles`
--

/*!40000 ALTER TABLE `psychologist_pacientfiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `psychologist_pacientfiles` ENABLE KEYS */;

--
-- Table structure for table `psychologist_psychologist`
--

DROP TABLE IF EXISTS `psychologist_psychologist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_psychologist` (
  `id_psychologist` int NOT NULL AUTO_INCREMENT,
  `pacient_count` int NOT NULL,
  `license_code` varchar(100) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `assigned_to_hotline` tinyint(1) NOT NULL,
  `years_experience` int NOT NULL,
  `id_user_id` int NOT NULL,
  PRIMARY KEY (`id_psychologist`),
  KEY `psychologist_psychol_id_user_id_e51d27fe_fk_user_user` (`id_user_id`),
  CONSTRAINT `psychologist_psychol_id_user_id_e51d27fe_fk_user_user` FOREIGN KEY (`id_user_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_psychologist`
--

/*!40000 ALTER TABLE `psychologist_psychologist` DISABLE KEYS */;
INSERT INTO `psychologist_psychologist` VALUES (1,0,'12345',1,0,10,7),(2,4,'67890',1,1,15,8),(3,0,'54321',1,0,8,9);
/*!40000 ALTER TABLE `psychologist_psychologist` ENABLE KEYS */;

--
-- Table structure for table `psychologist_session`
--

DROP TABLE IF EXISTS `psychologist_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_session` (
  `id_session` int NOT NULL AUTO_INCREMENT,
  `session_date` datetime(6) NOT NULL,
  `id_expedient_id` int NOT NULL,
  PRIMARY KEY (`id_session`),
  KEY `psychologist_session_id_expedient_id_62022988_fk_psycholog` (`id_expedient_id`),
  CONSTRAINT `psychologist_session_id_expedient_id_62022988_fk_psycholog` FOREIGN KEY (`id_expedient_id`) REFERENCES `psychologist_expedient` (`id_expedient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_session`
--

/*!40000 ALTER TABLE `psychologist_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `psychologist_session` ENABLE KEYS */;

--
-- Table structure for table `psychologist_ticket`
--

DROP TABLE IF EXISTS `psychologist_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychologist_ticket` (
  `id_ticket` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `state` varchar(55) NOT NULL,
  `id_user_id` int NOT NULL,
  PRIMARY KEY (`id_ticket`),
  KEY `psychologist_ticket_id_user_id_24b2a4e5_fk_user_users_id_user` (`id_user_id`),
  CONSTRAINT `psychologist_ticket_id_user_id_24b2a4e5_fk_user_users_id_user` FOREIGN KEY (`id_user_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychologist_ticket`
--

/*!40000 ALTER TABLE `psychologist_ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `psychologist_ticket` ENABLE KEYS */;

--
-- Table structure for table `rol_rol`
--

DROP TABLE IF EXISTS `rol_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_rol` (
  `id_rol` int NOT NULL,
  `rol_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_rol`
--

/*!40000 ALTER TABLE `rol_rol` DISABLE KEYS */;
INSERT INTO `rol_rol` VALUES (1,'administrator'),(2,'student'),(3,'psychologist'),(4,'moderator');
/*!40000 ALTER TABLE `rol_rol` ENABLE KEYS */;

--
-- Table structure for table `student_student`
--

DROP TABLE IF EXISTS `student_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_student` (
  `id_student` int NOT NULL AUTO_INCREMENT,
  `government_subsidy` tinyint(1) NOT NULL,
  `scholarship` tinyint(1) NOT NULL,
  `id_grade_id` int NOT NULL,
  `id_institution_id` int NOT NULL,
  `id_user_id` int NOT NULL,
  `psychologist_in_charge_id` int DEFAULT NULL,
  PRIMARY KEY (`id_student`),
  KEY `student_student_id_grade_id_6660d41d_fk_grade_grade_id_grade` (`id_grade_id`),
  KEY `student_student_id_institution_id_018ac0a7_fk_instituto` (`id_institution_id`),
  KEY `student_student_id_user_id_0bf79039_fk_user_users_id_user` (`id_user_id`),
  KEY `student_student_psychologist_in_char_16ee0361_fk_psycholog` (`psychologist_in_charge_id`),
  CONSTRAINT `student_student_id_grade_id_6660d41d_fk_grade_grade_id_grade` FOREIGN KEY (`id_grade_id`) REFERENCES `grade_grade` (`id_grade`),
  CONSTRAINT `student_student_id_institution_id_018ac0a7_fk_instituto` FOREIGN KEY (`id_institution_id`) REFERENCES `instituto_institutions` (`id_institution`),
  CONSTRAINT `student_student_id_user_id_0bf79039_fk_user_users_id_user` FOREIGN KEY (`id_user_id`) REFERENCES `user_users` (`id_user`),
  CONSTRAINT `student_student_psychologist_in_char_16ee0361_fk_psycholog` FOREIGN KEY (`psychologist_in_charge_id`) REFERENCES `psychologist_psychologist` (`id_psychologist`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_student`
--

/*!40000 ALTER TABLE `student_student` DISABLE KEYS */;
INSERT INTO `student_student` VALUES (1,1,0,7,1,2,NULL),(2,0,1,8,2,3,NULL),(3,1,1,9,3,4,NULL),(4,0,0,10,4,5,NULL),(5,1,0,11,1,6,NULL),(6,1,1,12,3,10,NULL);
/*!40000 ALTER TABLE `student_student` ENABLE KEYS */;

--
-- Table structure for table `user_users`
--

DROP TABLE IF EXISTS `user_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_users` (
  `is_superuser` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `id_user` int NOT NULL AUTO_INCREMENT,
  `state` tinyint(1) NOT NULL,
  `dni_number` varchar(9) NOT NULL,
  `sex` varchar(75) NOT NULL,
  `username` varchar(100) NOT NULL,
  `crated_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `birth_date` date NOT NULL,
  `name` varchar(100) NOT NULL,
  `first_name` varchar(75) NOT NULL,
  `last_name` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(8) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `id_rol_id` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `dni_number` (`dni_number`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_users_id_rol_id_b4cfa4f8_fk_rol_rol_id_rol` (`id_rol_id`),
  CONSTRAINT `user_users_id_rol_id_b4cfa4f8_fk_rol_rol_id_rol` FOREIGN KEY (`id_rol_id`) REFERENCES `rol_rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_users`
--

/*!40000 ALTER TABLE `user_users` DISABLE KEYS */;
INSERT INTO `user_users` VALUES (0,0,'2024-11-09 20:00:41.999755',1,0,'604180196','masculino','Jocksan','2024-11-09 20:00:41.999828','2024-11-09 20:00:41.999831','1994-07-30','Jocksan','Cardenas','Garcia','jcardenas@fwdcostarica.com','pbkdf2_sha256$870000$k5LIWsxl7Fyj0BL6z1cMDH$OrYPrPvI7p8WJZU0ER0BztwhJFdkEmc38cQsoNgkMxE=','8476716',NULL,1,1),(0,0,'2024-11-09 20:09:10.995103',2,0,'123456789','masculino','Estudiante1','2024-11-09 20:09:10.995166','2024-11-09 20:09:10.995170','1997-03-12','Carlos','Martinez','Gomez','carlos.martinez@gmail.com','pbkdf2_sha256$870000$kTAsk4AwIE91ifI4K4xwg3$kRt2NMHyMO8zrFimTjMncXDuVrfSitq62TkYN7vHjJk=','87654321',NULL,1,2),(0,0,'2024-11-09 20:13:01.038563',3,0,'987654321','femenino','Estudiante2','2024-11-09 20:13:01.038592','2024-11-09 20:13:01.038594','2000-06-22','Ana','Lopez','Vega','ana.lopez@gmail.com','pbkdf2_sha256$870000$QhrxHMNMaFNf0cYZNAGQHu$N2tdDwpqxYyOEGCqyy2SZSy5+LDvzzjFXmv1TKaPAjc=','84567901',NULL,1,2),(0,0,'2024-11-09 20:14:20.340956',4,0,'456789123','masculino','Estudiante3','2024-11-09 20:14:20.340985','2024-11-09 20:14:20.340987','1999-11-15','Juan','Hernandez','Diaz','juan.hernandez@gmail.com','pbkdf2_sha256$870000$D3hhvqyUXtw8uMM8dW5vIV$f7q6AxSaWcizuaH8GoOIWPKVirJW55UQh/OsIY0ZxgA=','89765432',NULL,1,2),(0,0,'2024-11-09 20:15:41.181627',5,0,'321654987','femenino','Estudiante4','2024-11-09 20:15:41.181658','2024-11-09 20:15:41.181661','1998-02-05','Maria','Sanchez','Ramirez','maria.sanchez@gmail.com','pbkdf2_sha256$870000$gq5diQJkMryF0VJKqgnNQs$kNMHqgV0cuPZ3GPq0KRLtaLhJP7n/EiDH+gJ7gBeBHY=','81234567',NULL,1,2),(0,0,'2024-11-09 20:16:38.658966',6,0,'654123789','masculino','Estudiante5','2024-11-09 20:16:38.658999','2024-11-09 20:16:38.659001','2001-09-30','Jose','Gonzalez','Perez','jose.gonzalez@gmail.com','pbkdf2_sha256$870000$ylVfaU7SIkeez06vVumwnJ$Q1j18uWJdsrM/5Pk0cJj9Y++2weDsdBlNZ4vKykRmqg=','86753090',NULL,1,2),(0,0,'2024-11-09 20:26:42.997949',7,0,'443456789','femenino','Psicologa1','2024-11-09 20:26:42.997978','2024-11-09 20:26:42.997980','1985-07-20','Lucia','Torres','Morales','lucia.torres@gmail.com','pbkdf2_sha256$870000$17J6ctVVO0KLBDTSonfMdW$II4HYiYSItrA8Wpg6PNAcv1+G0FWgjkM3JfImVGXJho=','87654321',NULL,1,3),(0,0,'2024-11-09 20:27:53.576262',8,0,'987334321','masculino','Psicologo2','2024-11-09 20:27:53.576292','2024-11-09 20:27:53.576294','1979-04-15','Carlos','Soto','Mendez','carlos.soto@gmail.com','pbkdf2_sha256$870000$YWdAuNP8TmqQLysPrzpbyR$Bpvw0xpkDXirq5/pWQhEHgAjPTadae/HwQpw8mD4hPU=','89456732',NULL,1,3),(0,0,'2024-11-09 20:29:13.695538',9,0,'456786623','femenino','Psicologa3','2024-11-09 20:29:13.695565','2024-11-09 20:29:13.695567','1990-11-11','Sofia','Rojas','Perez','sofia.rojas@gmail.com','pbkdf2_sha256$870000$CdpOxUnOhYutDOL1f0Fq3J$ewDNma2b/4+rDnwD9+Utw54IJ0FsCGwfH63i9LK11DY=','81234567',NULL,1,3),(0,0,'2024-11-10 01:04:01.008616',10,0,'983427873','masculino','Memo','2024-11-10 01:04:01.008701','2024-11-10 01:04:01.008705','2002-10-31','memo','cordoba','jimenez','estudiantetest388@gmail.com','pbkdf2_sha256$870000$PGuhhsyqSwjp2Lm6x3ndC7$xfDnljMul1FMYlzuvaF6Y9M86Z2c28u30QhQJzWUML8=','98897667',NULL,1,2);
/*!40000 ALTER TABLE `user_users` ENABLE KEYS */;

--
-- Table structure for table `user_users_groups`
--

DROP TABLE IF EXISTS `user_users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_users_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_users_groups_users_id_group_id_df5fa2ae_uniq` (`users_id`,`group_id`),
  KEY `user_users_groups_group_id_5df0dc90_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_users_groups_group_id_5df0dc90_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_users_groups_users_id_232e6679_fk_user_users_id_user` FOREIGN KEY (`users_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_users_groups`
--

/*!40000 ALTER TABLE `user_users_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_users_groups` ENABLE KEYS */;

--
-- Table structure for table `user_users_user_permissions`
--

DROP TABLE IF EXISTS `user_users_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_users_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_users_user_permissions_users_id_permission_id_5fc04ed5_uniq` (`users_id`,`permission_id`),
  KEY `user_users_user_perm_permission_id_8c68afab_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_users_user_perm_permission_id_8c68afab_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_users_user_perm_users_id_e1262029_fk_user_user` FOREIGN KEY (`users_id`) REFERENCES `user_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_users_user_permissions`
--

/*!40000 ALTER TABLE `user_users_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_users_user_permissions` ENABLE KEYS */;

--
-- Dumping routines for database 'django-react'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 21:17:09
