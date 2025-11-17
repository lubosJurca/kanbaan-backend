/*
  Warnings:

  - A unique constraint covering the columns `[id_user,order]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_board,order]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_task,order]` on the table `Subtask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_column,order]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Board_id_user_order_key" ON "Board"("id_user", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Column_id_board_order_key" ON "Column"("id_board", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Subtask_id_task_order_key" ON "Subtask"("id_task", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_column_order_key" ON "Task"("id_column", "order");
