/**
 * Execute a deno command and wait for the status and output.
 *
 * @param command - The command to execute as an array. Do not specify 'deno' as the first element.
 *
 * @returns The status and output of the command.
 */
export async function deno(
  command: string[],
): Promise<{
  proc: Deno.Process<
    {
      cmd: string[];
      stdout: 'piped';
      stderr: 'piped';
    }
  >;
  status: Deno.ProcessStatus;
  stdout: string;
  stderr: string;
}> {
  if (
    command[
      0
    ] !== 'deno'
  ) {
    command
      .unshift(
        'deno',
      );
  }

  // Execute the command and collect results. Exit the application on failure to locate git.
  const proc = Deno.run({
    cmd: command,
    stdout: 'piped',
    stderr: 'piped',
  });
  const status = await proc
    .status();
  const stdout = new TextDecoder()
    .decode(
      await proc
        .output(),
    );
  const stderr = new TextDecoder()
    .decode(
      await proc
        .stderrOutput(),
    );

  // Send the response to the caller.
  return {
    proc,
    status,
    stdout,
    stderr,
  };
}
