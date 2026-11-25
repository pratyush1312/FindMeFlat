CREATE TABLE `web_search_limits` (
	`month` text PRIMARY KEY NOT NULL,
	`used` integer NOT NULL,
	`next_allowed_ms` integer NOT NULL
);
