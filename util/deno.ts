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
  proc: Deno.Command;
  status: number;
  stdout: string;
  stderr: string;
}> {
  // Execute the command and collect results. Exit the application on failure to locate git.
  console.info(command.join(' '));
  const proc = new Deno.Command(Deno.execPath(), {
    args: command,
  });
  const { code: status, stdout, stderr } = await proc.output();
  const stdoutString = new TextDecoder()
    .decode(
      stdout,
    );
  const stderrString = new TextDecoder()
    .decode(
      stderr,
    );

  // Send the response to the caller.
  return {
    proc,
    status,
    stdout: stdoutString,
    stderr: stderrString,
  };
}
