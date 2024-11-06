-- CreateIndex
CREATE INDEX "user_progress_userId_classId_idx" ON "user_progress"("userId", "classId");

-- CreateIndex
CREATE INDEX "user_progress_userId_subtopicId_idx" ON "user_progress"("userId", "subtopicId");
