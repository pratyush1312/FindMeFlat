CREATE TABLE `research_memory` (
	`owner` text NOT NULL,
	`project_key` text NOT NULL,
	`data` text NOT NULL,
	`first_opened` text NOT NULL,
	`last_opened` text NOT NULL,
	`opens` integer DEFAULT 1 NOT NULL,
	PRIMARY KEY(`owner`, `project_key`)
);
--> statement-breakpoint
CREATE TABLE `research_report_versions` (
	`owner` text NOT NULL,
	`rera` text NOT NULL,
	`version` integer NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`owner`, `rera`, `version`)
);
--> statement-breakpoint
CREATE TABLE `research_searches` (
	`owner` text NOT NULL,
	`query` text NOT NULL,
	`last_used` text NOT NULL,
	PRIMARY KEY(`owner`, `query`)
);

--> statement-breakpoint
INSERT OR IGNORE INTO research_report_versions(owner,rera,version,data,updated_at) SELECT owner,rera,version,data,updated_at FROM research_reports;
