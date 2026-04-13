export type ApiUser = {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
};

export type ApiCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailDescription: string;
  track: string;
  pricePaise: number;
  priceRupees: number;
  liveSessionsFirst: number;
  liveSessionsSecond: number;
  totalLiveSessions: number;
  isDemo: boolean;
  previewVideoUrl: string;
  thumbnailUrl: string;
  marketingTitle: string;
  marketingBullets: string[];
  classStartsAt: string | null;
  isActive: boolean;
};

export type ApiBooking = {
  id: string;
  amountPaise: number;
  amountRupees: number;
  currency: string;
  status: string;
  paymentRef: string;
  scheduledAt: string | null;
  notes: string;
  createdAt: string | null;
  course: {
    id: string;
    title: string;
    slug: string;
    previewVideoUrl: string;
    thumbnailUrl: string;
    liveSessionsFirst: number;
    liveSessionsSecond: number;
    totalLiveSessions: number;
    classStartsAt: string | null;
  } | null;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
