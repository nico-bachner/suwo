-- CreateTable
CREATE TABLE "public"."EventAttendance" (
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventAttendance_pkey" PRIMARY KEY ("user_id","event_id")
);

-- AddForeignKey
ALTER TABLE "public"."EventAttendance" ADD CONSTRAINT "EventAttendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventAttendance" ADD CONSTRAINT "EventAttendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
