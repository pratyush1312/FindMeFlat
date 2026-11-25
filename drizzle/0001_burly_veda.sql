CREATE TABLE `captures` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`data` text NOT NULL,
	`project_id` text,
	`created_at` text NOT NULL
);
