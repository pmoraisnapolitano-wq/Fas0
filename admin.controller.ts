import { Request, Response } from 'express';
import { adminService } from './admin.service';
import { sendSuccess, sendPaginated } from '../utils/response';
import { asyncHandler } from '../middleware/errorHandler';

export const adminController = {
  getUsers: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { users, total } = await adminService.getUsers(page, limit);
    sendPaginated(res, users, page, limit, total);
  }),

  updateUser: asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await adminService.updateUser(userId, req.body);
    sendSuccess(res, user, 'User updated');
  }),

  getAuditLogs: asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const { logs, total } = await adminService.getAuditLogs(page, limit);
    sendPaginated(res, logs, page, limit, total);
  }),

  getStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await adminService.getStats();
    sendSuccess(res, stats);
  }),
};
