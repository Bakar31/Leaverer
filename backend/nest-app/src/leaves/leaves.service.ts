import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { Leave, LeaveStatus } from './leaves.entity';
import { Notification } from './notification.entity';

@Injectable()
export class LeavesService {
  private em: EntityManager;

  constructor(entityManager: EntityManager) {
    this.em = entityManager;
  }

  async requestLeave(
    user: User,
    manager: User,
    date: Date,
    type: string,
    reason?: string,
  ): Promise<void> {
    const leave = new Leave();
    leave.user = user;
    leave.approvedBy = manager;
    leave.date = date;
    leave.type = type;
    leave.reason = reason;

    const managerNotification = new Notification();
    managerNotification.sender = user;
    managerNotification.receiver = manager;
    managerNotification.message = `Leave request from ${user.firstName} for ${date}`;

    await this.em.persistAndFlush([leave, managerNotification]);
  }

  async approveLeave(leaveId: string): Promise<void> {
    const leave = await this.em.findOneOrFail(Leave, leaveId);
    leave.status = LeaveStatus.APPROVED;

    const userNotification = new Notification();
    userNotification.sender = leave.approvedBy;
    userNotification.receiver = leave.user;
    userNotification.message = `Leave request approved for ${leave.date}`;

    await this.em.persistAndFlush([leave, userNotification]);
  }

  async rejectLeave(leaveId: string): Promise<void> {
    const leave = await this.em.findOneOrFail(Leave, leaveId);
    leave.status = LeaveStatus.REJECTED;

    const userNotification = new Notification();
    userNotification.sender = leave.approvedBy;
    userNotification.receiver = leave.user;
    userNotification.message = `Leave request rejected for ${leave.date}`;

    await this.em.persistAndFlush([leave, userNotification]);
  }
}
