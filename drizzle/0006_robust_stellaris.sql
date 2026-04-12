CREATE TABLE "chatBotMetadata" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"color" text DEFAULT '#4f39f6',
	"welcom_message" text DEFAULT 'Hi there how can i help you today',
	"created_at" text DEFAULT now()
);
