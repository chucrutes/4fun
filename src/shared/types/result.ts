export type Result<Data, Error = unknown> =
  | {
      success: true;

      data: Data;
    }
  | {
      success: false;

      error: Error;
    };
