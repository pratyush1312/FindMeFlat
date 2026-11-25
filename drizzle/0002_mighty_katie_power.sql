CREATE TABLE `research_reports` (
	`owner` text NOT NULL,
	`rera` text NOT NULL,
	`data` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`owner`, `rera`)
);
