import { debounce } from "./utils";

describe("utils", () => {
  describe("debounce(func, durationMs)", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test("executes func", () => {
      const func = jest.fn(() => {});
      const durationMs = 100;

      const debouncedFn = debounce(func, durationMs);
      debouncedFn();

      jest.advanceTimersByTime(1);
      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(durationMs - 1);
      expect(func).toBeCalledTimes(1);
    });

    test("executes latest func once when called multiple times for some duration", () => {
      const func = jest.fn((n) => n);
      const durationMs = 100;
      const debouncedFn = debounce(func, durationMs);
      
      debouncedFn(1);
      jest.advanceTimersByTime(durationMs - 1);
      debouncedFn(2);
      jest.advanceTimersByTime(durationMs - 1);
      debouncedFn(3);
      jest.advanceTimersByTime(durationMs - 1);

      expect(func).not.toBeCalled();

      jest.advanceTimersByTime(durationMs);
      expect(func).toBeCalledTimes(1);
      expect(func).toBeCalledWith(3);
    });

    test("executes latest func once when called multiple times after some duration", () => {
      const func = jest.fn((n) => n);
      const durationMs = 100;
      const debouncedFn = debounce(func, durationMs);
      
      debouncedFn(1);
      jest.advanceTimersByTime(durationMs + 1);
      debouncedFn(2);
      jest.advanceTimersByTime(durationMs + 1);
      debouncedFn(3);
      jest.advanceTimersByTime(durationMs + 1);

      expect(func).toBeCalledTimes(3);
      expect(func).toBeCalledWith(3);
    });
  });
});
