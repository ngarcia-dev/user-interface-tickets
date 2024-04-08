<a name="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<a href="https://github.com/ngarcia-dev/user-interface-tickets">
  <img width="300px" src="./public/img/logo_ticket.webp" alt="Logo" width="800" />
</a>

## Ticket System - User Interface

Esta interfaz de usuario consume la [rest API][system-url] de un sistema de soporte al usuario, donde se obtendra un registro de pedidos y un mejor control de tareas en una institución.\
[Diseño de Figma](https://www.figma.com/file/Qo9Plydggobhdq59qBA1ni/Manager-Ticket?type=design&mode=design&t=2JKYSr0onFwmeGNo-0) · [Reportar error](https://github.com/ngarcia-dev/user-interface-tickets/issues) · [Sugerir algo](https://github.com/ngarcia-dev/user-interface-tickets/issues)

</div>

## Características principales

- **Manage Tickets**: Obtén información detallada sobre cada ticket dirigido a tu dependecia, sector interno o usuario, tales como título, descripción, prioridad y estado.
- **Crear Tickets**: Permite a los usuarios de respectivos roles y sectores internos crear los pedidos necesarios a una dependencia y sector interno que ofrezca los servicios que atiendan su necesidad.
<!-- - **Jerarquia de roles**: La aplicación tiene un sistema jerarquico  -->

## Para empezar

### Prerequisitos

- NVM (recomendado para asegurar versión de Node) ver [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

  ```sh
  nvm use
  # o
  nvm use <version>
  ```

  > Si quieres automatizar el proceso, puedes crear un script siguiendo la [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

<details>
	<summary>Pequeño script de automatización</summary>
	
- For Linux/MacOS:
	```sh
	# .bashrc | .zshrc | cualquier archivo de configuración
	# pequeño script para cambiar de version al entrar al directorio
	cd() {
  builtin cd "$@"
		if [[ -f .nvmrc ]]; then
			nvm use > /dev/null
			# Si quieres que te diga la versión
			nvm use
		fi
	}
	```

- For Windows:

  ```powershell
  # $PROFILE
  function Change-Node-Version {
  	param($path)
  	& Set-Location $path
  	$pwd = pwd
  	if ( Test-Path "$pwd\\.nvmrc" ) {
  		$version = Get-Content .nvmrc
  		nvm use $version
  	}
  }
  New-Alias -Name cd -Value Change-Node-Version -Force -Option AllScope
  ```

  </details>

- PNPM (es nuestra recomendación por su eficiencia y rapidez)

  ```sh
  npm install -g pnpm
  ```

- o NPM

  ```sh
  npm install npm@latest -g
  ```

### Instalación

1. Clona el repositorio

   ```sh
   git clone https://github.com/ngarcia-dev/user-interface-tickets.git
   ```

2. Instala los paquetes de NPM

   ```sh
   pnpm install
   ```

3. Ejecuta el proyecto

   ```sh
   pnpm run dev
   ```

## 🛠️ Stack

- [![React JS][react-badge]][react-url] - The library for web and native user interfaces.
- [![Vite JS][vite-badge]][vite-url] - Get ready for a development environment that can finally catch up with you.
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - A utility-first CSS framework for rapidly building custom designs.
- [![radix-ui][radix-ui-badge]][radix-ui-url] - An open source component library optimized for fast development, easy maintenance, and accessibility. Just import and go—no configuration required.

[react-url]: https://reactjs.org/
[react-badge]: https://img.shields.io/badge/React-000?style=for-the-badge&logo=react
[vite-url]: https://vitejs.dev/
[vite-badge]: https://img.shields.io/badge/vite-000?style=for-the-badge&logo=vite
[tailwind-url]: https://tailwindcss.com/
[tailwind-badge]: https://img.shields.io/badge/Tailwind-000?style=for-the-badge&logo=tailwindcss
[radix-ui-url]: https://www.radix-ui.com/
[radix-ui-badge]: https://img.shields.io/badge/radixui-000?style=for-the-badge&logo=radix-ui
[contributors-shield]: https://img.shields.io/github/contributors/ngarcia-dev/user-interface-tickets.svg?style=for-the-badge
[contributors-url]: https://github.com/ngarcia-dev/user-interface-tickets/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ngarcia-dev/user-interface-tickets.svg?style=for-the-badge
[forks-url]: https://github.com/ngarcia-dev/user-interface-tickets/network/members
[stars-shield]: https://img.shields.io/github/stars/ngarcia-dev/user-interface-tickets.svg?style=for-the-badge
[stars-url]: https://github.com/ngarcia-dev/user-interface-tickets/stargazers
[issues-shield]: https://img.shields.io/github/issues/ngarcia-dev/user-interface-tickets.svg?style=for-the-badge
[issues-url]: https://github.com/ngarcia-dev/user-interface-tickets/issues
[system-url]: https://github.com/ngarcia-dev/ticket-system-api
