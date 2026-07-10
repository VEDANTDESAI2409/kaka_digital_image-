import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getDashboard() {
    const stats = await this.getStats();
    const upcomingEvents = await this.getUpcomingEvents();
    const recentUploads = await this.getRecentUploads();
    const recentBookings = await this.getRecentBookings();
    const storage = await this.getStorageInfo();

    return {
      stats,
      upcomingEvents,
      recentUploads,
      recentBookings,
      storage,
    };
  }

  private async getStats() {
    const [
      activeClients,
      pendingUploads,
      totalEvents,
    ] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.media.count(),
      this.prisma.event.count(),
    ]);

    return {
      activeClients,
      pendingUploads,
      todayEvents: totalEvents, // We'll replace this with actual today's events later
      editingQueue: 0,
    };
  }

  private async getUpcomingEvents() {
    return this.prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: 'asc',
      },
      take: 5,
      select: {
        id: true,
        title: true,
        venue: true,
        city: true,
        startDate: true,
      },
    });
  }

  private async getRecentUploads() {
    return this.prisma.media.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        originalName: true,
        status: true,
        type: true,
        createdAt: true,
      },
    });
  }

  private async getRecentBookings() {
  return this.prisma.booking.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      bookingNumber: true,
      status: true,
      createdAt: true,
      title: true,
      client: {
        select: {
          primaryContactName: true,
        },
      },
    },
  });
}

  private async getStorageInfo() {
    const mediaAggregate = await this.prisma.media.aggregate({
      _sum: {
        size: true,
      },
    });

    const usedStorage = mediaAggregate._sum.size ?? 0;

    return {
      used: usedStorage,
      total: 500 * 1024 * 1024 * 1024, // 500 GB
    };
  }
}