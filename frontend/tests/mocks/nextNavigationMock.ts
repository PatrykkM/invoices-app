import { jest } from "@jest/globals";

export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
});

export const usePathname = () => "/test";
export const useSearchParams = () => new URLSearchParams();
