import shell from 'shelljs'
import pc from 'picocolors'
import { intro, outro, select } from '@clack/prompts'
import { trytm } from '@bdsqqq/try'

const path = '/Users/jorgeac/Workspace/Workspaces'

async function main() {
  intro(pc.yellow(`Mostrando los archivos en la carpeta ${path}`))

  const [data, error] = await trytm(shell.cd(path).exec('ls', { silent: true }))

  if (error) {
    console.log(pc.red(error))
    return process.exit(1)
  }
  const options = data
    .split('\n')
    .filter(Boolean)
    .map((file) => ({ value: file, label: file }))

  const selected = await select({
    message: 'Choose a file to open with VSCode:',
    options,
  })
  const command = `code ${selected}`
  console.log(pc.green(`Ejecutando comando: ${command}`))
  shell.exec(command)

  outro(pc.green(`¡Listo!`))
}

main()
