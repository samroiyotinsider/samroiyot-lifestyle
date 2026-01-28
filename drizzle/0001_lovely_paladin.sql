CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`message` text NOT NULL,
	`inquiryType` enum('property','concierge','general') NOT NULL,
	`status` enum('new','contacted','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lifestyleArticles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleTh` varchar(255),
	`slug` varchar(255) NOT NULL,
	`excerpt` text NOT NULL,
	`excerptTh` text,
	`content` text NOT NULL,
	`contentTh` text,
	`coverImage` varchar(500),
	`category` varchar(100),
	`published` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lifestyleArticles_id` PRIMARY KEY(`id`),
	CONSTRAINT `lifestyleArticles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleTh` varchar(255),
	`description` text NOT NULL,
	`descriptionTh` text,
	`propertyType` enum('condo','house','villa','land') NOT NULL,
	`price` int NOT NULL,
	`priceUsd` int,
	`sizeSqm` int,
	`sizeRai` varchar(50),
	`bedrooms` int,
	`bathrooms` int,
	`features` text NOT NULL DEFAULT ('[]'),
	`images` text NOT NULL DEFAULT ('[]'),
	`videoUrl` varchar(500),
	`latitude` varchar(50),
	`longitude` varchar(50),
	`address` text,
	`addressTh` text,
	`fazwazUrl` varchar(500),
	`status` enum('available','sold','pending') NOT NULL DEFAULT 'available',
	`featured` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
