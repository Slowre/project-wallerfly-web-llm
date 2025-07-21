# Walletfy

**Walletfy** es una aplicación web sencilla que te ayuda a llevar el control de tus ingresos y gastos de forma organizada y visual.

---

## ¿Qué hace Walletfy?

Imagina tener una billetera digital donde puedas registrar cuánto dinero tienes, anotar cada ingreso o egreso, y ver cómo varía tu saldo mes a mes. Eso es Walletfy.

Con esta app puedes:

- Establecer un balance inicial.
- Añadir eventos de ingreso o egreso.
- Ver tu flujo de dinero agrupado por mes.
- Saber cuánto ganaste, cuánto gastaste y cuál fue tu balance global.
- Editar o eliminar eventos fácilmente.
- Alternar entre modo claro y oscuro.

---

## ¿Cómo está hecha?

Walletfy está construida con:

- **React** – Librería para construir interfaces.
- **React-Query** – Manejo de sincronización de datos.
- **Zustand** – Para manejar el estado global de forma simple.
- **Zod** – Para validar los formularios sin complicaciones.
- **Day.js** – Para dar formato y agrupar las fechas de los eventos.
- **TailwindCSS** – Para estilos rápidos y responsivos.
- **uuid** – Para asignar identificadores únicos a los eventos.
- **localStorage** – Para guardar tus datos sin necesidad de un servidor.

---

## ¿Cómo lo ejecuto en mi computadora?

Sigue estos pasos para probar Walletfy localmente:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Slowre/project-wallerfly.git
   cd walletfy
2. Instala las dependencias:

    ```bash
    npm install
3. Inicia el proyecto:

    ```bash
    npm run dev

4. Abre tu navegador y entra a:

    http://localhost:3000