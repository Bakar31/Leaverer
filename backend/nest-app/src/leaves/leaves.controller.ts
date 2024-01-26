import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { Leave, LeaveStatus } from './leaves.entity';

@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Post()
  async createLeaveRequests(@Body() leaveRequests: any[]): Promise<Leave[]> {
    const createdLeaveRequests =
      await this.leavesService.createLeaveRequests(leaveRequests);
    console.log(createdLeaveRequests);
    return createdLeaveRequests;
  }

  @Get(':id/pending')
  async getPendingLeaveRequestsForEmployee(
    @Param('id') userId: number,
  ): Promise<Leave[]> {
    return this.leavesService.getPendingLeaveRequestsForEmployee(userId);
  }

  @Get('manager/:id/pending')
  async getPendingLeaveRequestsForManager(
    @Param('id') managerId: number,
  ): Promise<Leave[]> {
    return this.leavesService.getPendingLeaveRequestsForManager(managerId);
  }

  @Post(':id/approve')
  async approveLeave(@Param('id') leaveId: string): Promise<Leave> {
    return this.leavesService.updateLeaveStatus(leaveId, LeaveStatus.APPROVED);
  }

  @Post(':id/reject')
  async rejectLeave(@Param('id') leaveId: string): Promise<Leave> {
    return this.leavesService.updateLeaveStatus(leaveId, LeaveStatus.REJECTED);
  }

  @Get(':organizationId/absent-today')
  async getAbsentToday(@Param('organizationId') organizationId: number) {
    const today = new Date();
    const absentEmployees = await this.leavesService.getAbsentEmployees(
      today,
      organizationId,
    );
    return absentEmployees;
  }
}
