CREATE TABLE "metadata" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid NOT NULL,
	"user_email" text NOT NULL,
	"business_name" text NOT NULL,
	"webiste_url" text NOT NULL,
	"external_links" text,
	"created_at" text DEFAULT now()
);
