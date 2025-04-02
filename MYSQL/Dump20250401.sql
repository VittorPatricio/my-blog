CREATE DATABASE  IF NOT EXISTS `blog_simples` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog_simples`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog_simples
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Post Bonito','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',2,'2025-04-02 00:41:07','2025-04-02 00:41:07'),(2,'Ola meu nome é vittor','Tenho 20 anos, sou estudante da fatec de taquaritinga e adoro coockies!',2,'2025-04-02 00:41:41','2025-04-02 00:41:41'),(3,'Where does it come from','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',2,'2025-04-02 00:42:03','2025-04-02 00:42:03'),(4,'Where can I get some?','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',2,'2025-04-02 00:42:18','2025-04-02 00:42:18'),(5,'Why do we use it?','\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',2,'2025-04-02 00:42:37','2025-04-02 00:42:37'),(6,'Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC','\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"',3,'2025-04-02 00:46:14','2025-04-02 00:46:14'),(7,'Vidas Secas','Um retrato realista e tocante da vida dos retirantes nordestinos, onde a luta contra a seca e a opressão revela a resiliência e a dignidade de um povo.',3,'2025-04-02 00:47:53','2025-04-02 00:47:53'),(8,'Memórias Póstumas de Brás Cubas','Uma narrativa irreverente contada pelo fantasma de Brás Cubas, que observa com humor e ironia as hipocrisias e os vícios da sociedade brasileira do século XIX, quebrando convenções literárias.',3,'2025-04-02 00:49:29','2025-04-02 00:49:29'),(9,'Dom Casmurro','Um mergulho na mente de Bentinho, onde as dúvidas sobre o amor e a fidelidade permeiam cada linha, criando uma atmosfera de mistério e ambiguidade que instiga o leitor a questionar a verdade dos fatos narrados.',3,'2025-04-02 00:50:04','2025-04-02 00:50:04'),(10,'Grande Sertão: Veredas','Uma epopeia literária que explora os limites da linguagem e da existência, narrada através das intensas experiências de um jagunço em meio ao sertão brasileiro, onde a dualidade entre o bem e o mal é constantemente desafiada.',3,'2025-04-02 00:50:15','2025-04-02 00:50:15'),(11,'Iracema','Um romance lírico que mistura lenda e história, retratando a origem mítica do povo brasileiro através do amor trágico entre uma índia e um colonizador, simbolizando o encontro e o conflito entre diferentes culturas.',3,'2025-04-02 00:50:24','2025-04-02 00:50:24'),(12,'O Guarani','Um romance emblemático que combina aventura, romance e elementos indígenas, retratando a nobreza dos povos originários e a formação do imaginário nacional, enquanto destaca o heroísmo e a luta pela liberdade em um cenário repleto de desafios e tradições.',3,'2025-04-02 00:50:35','2025-04-02 00:50:35'),(13,'Auto da Compadecida','Uma peça teatral repleta de humor e crítica social, onde personagens astutos do Nordeste se envolvem em situações surpreendentes e divinamente interligadas, oferecendo uma reflexão sobre fé, justiça e a misericórdia em meio a um enredo cheio de ironia.',3,'2025-04-02 00:50:43','2025-04-02 00:50:43'),(14,'Capitães da Areia','Um retrato poderoso das crianças e adolescentes abandonados nas ruas de Salvador, que enfrentam a marginalização e a violência urbana. Mesmo em meio às dificuldades, a obra destaca a camaradagem e a luta diária pela sobrevivência e pela dignidade.',3,'2025-04-02 00:50:51','2025-04-02 00:50:51'),(15,'Quincas Borba','Uma obra que mescla filosofia e ficção, usando um humor ácido para explorar os paradoxos da ambição, do amor e da loucura. A narrativa questiona a natureza humana e expõe as contradições de uma sociedade marcada pela busca desenfreada por poder e riqueza.',3,'2025-04-02 00:50:59','2025-04-02 00:50:59'),(16,'A Moreninha','Um dos primeiros romances brasileiros, que aborda de forma leve e romântica os sentimentos do amor juvenil e as convenções sociais da época. A história envolve encontros, desencontros e a inocência dos primeiros amores, criando um clima nostálgico e encantador.',3,'2025-04-02 00:51:07','2025-04-02 00:51:07'),(17,'O Cortiço','Uma análise minuciosa da vida em um cortiço no Rio de Janeiro, onde diversas personalidades e histórias se entrelaçam. A obra revela como o ambiente carregado de conflitos e desigualdades sociais reflete as lutas e os instintos humanos em um microcosmo urbano.',3,'2025-04-02 00:51:14','2025-04-02 00:51:14'),(18,'Senhora','Um romance que explora as complexas relações entre amor, dinheiro e poder na sociedade do século XIX. Através da trajetória de uma mulher determinada a conquistar sua autonomia, a narrativa aborda preconceitos e as imposições de uma época marcada por convenções rígidas.',3,'2025-04-02 00:51:20','2025-04-02 00:51:20'),(19,'O Mulato','Uma obra naturalista que mergulha nas tensões raciais e sociais do Brasil, revelando com profundidade os conflitos e as desigualdades de uma sociedade marcada pelo preconceito. A paixão e o destino dos personagens são apresentados como reflexos diretos do contexto histórico.',3,'2025-04-02 00:51:38','2025-04-02 00:51:38'),(20,'Estorvo','Um romance contemporâneo que une introspecção e crítica social, explorando as ambiguidades da existência e os dilemas éticos dos personagens. A narrativa propõe uma visão multifacetada do caos e das contradições que permeiam a vida moderna.',3,'2025-04-02 00:51:42','2025-04-02 00:51:42'),(21,'Mar Morto','Uma narrativa que combina misticismo e realidade no sertão baiano, onde lendas e tradições locais se entrelaçam com as experiências pessoais dos personagens. A obra cria uma atmosfera poética e carregada de simbolismos sobre os ciclos da vida e da morte.',3,'2025-04-02 00:51:52','2025-04-02 00:51:52'),(22,'Saragana','Uma coletânea de contos que utiliza a oralidade e o imaginário do interior do Brasil para tecer histórias marcadas pela mitologia e pela tradição. Cada narrativa convida o leitor a mergulhar num universo repleto de enigmas e belezas naturais, refletindo a essência da cultura rural.',3,'2025-04-02 00:52:45','2025-04-02 00:52:45'),(23,'Fogo Morto','Uma obra que retrata a decadência do sistema agrário no Nordeste, mostrando as transformações sociais e os desafios enfrentados pelos trabalhadores rurais. O romance expõe, de forma sensível, os impactos das mudanças econômicas sobre a vida e a identidade de um povo.',3,'2025-04-02 00:54:32','2025-04-02 00:54:32');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin2','admin@blog.com','$2b$10$X7o4c5/QR5kFrW9A3lQkOuTEJFXgFGYmGcwFBBrpMQJIxZi0tQYxm',1,'2025-04-01 14:42:48'),(2,'vittor','vittorpatricio26@gmail.com','$2b$10$g6uc482TRF/2bdygYb8r8eGSCOTOjPAzE4CNVLRZH/uHOwfZXLj9m',1,'2025-04-02 00:30:53'),(3,'admin','admin@baitz.com.br','$2b$10$L3nuxUYgZHcwHfP5wFoIu.7kdGHCkCimydJxJgtkOpCSfERpciB6O',1,'2025-04-02 00:45:26');
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

-- Dump completed on 2025-04-01 22:12:46
