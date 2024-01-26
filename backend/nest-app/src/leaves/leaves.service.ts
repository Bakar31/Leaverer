import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Leave, LeaveStatus } from './leaves.entity';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: EntityRepository<Leave>,
    private readonly em: EntityManager,
  ) {}

  async createLeaveRequests(leaveRequestsData: any[]): Promise<Leave[]> {
    const dataArray = Array.isArray(leaveRequestsData)
      ? leaveRequestsData
      : [leaveRequestsData];
    const leaveRequests = dataArray.map((leaveRequestData) =>
      this.em.create(Leave, leaveRequestData),
    );

    await this.leaveRepository.persistAndFlush(leaveRequests);
    return leaveRequests;
  }

  async getPendingLeaveRequestsForEmployee(userId: number): Promise<Leave[]> {
    return this.leaveRepository.find({
      user: userId,
      status: LeaveStatus.PENDING,
    });
  }

  async getPendingLeaveRequestsForManager(managerId: number): Promise<Leave[]> {
    return this.leaveRepository.find({
      manager: managerId,
      status: LeaveStatus.PENDING,
    });
  }

  async updateLeaveStatus(
    leaveId: string,
    status: LeaveStatus,
  ): Promise<Leave> {
    const leave = await this.leaveRepository.findOneOrFail(leaveId);
    leave.status = status;
    await this.leaveRepository.flush();
    return leave;
  }

  async getAbsentEmployees(date: Date, organizationId: number) {
    const today = new Date(date.toDateString());

    const approvedLeaves = await this.leaveRepository.find({
      date: today,
      status: LeaveStatus.APPROVED,
      user: { organization: organizationId },
    });
    await this.leaveRepository.populate(approvedLeaves, ['user']);

    return approvedLeaves.map((leave) => ({
      employeeId: leave.user.id,
      employeeName: `${leave.user.firstName} ${leave.user.lastName}`,
    }));
  }
}
