# Sesión de Desarrollo: Vercel en Vivo, Login Obligatorio y Persistencia InsForge

**Fecha:** 31 de Agosto de 2026  
**Rama de Trabajo:** `main` / `dev`  
**Estado:** ✅ 100% Verificado en Producción en Vercel

---

## 🎯 Qué se ha hecho

1. **Corrección y Despliegue en Producción en Vercel:**
   - Se sincronizó la rama `main` y se desplegó la versión de producción en Vercel.
   - Verificado con Playwright en vivo contra `https://carnet-b-phi.vercel.app`.

2. **Inicio de Sesión Obligatorio (`LoginGateView.jsx`):**
   - Al entrar por primera vez desde un dispositivo no autenticado, se muestra la pantalla de acceso obligatorio (Google, Apple ID, Email).
   - Acceso bloqueado hasta autenticación para garantizar que el progreso de cada persona esté 100% separado desde el inicio.

3. **Persistencia del Dispositivo ("Recordar Dispositivo"):**
   - Una vez que un usuario inicia sesión en su móvil u ordenador, la sesión se guarda en el dispositivo y no vuelve a pedir login al recargar o volver a entrar, manteniendo sus datos sincronizados con InsForge PostgreSQL.
   - Si el usuario desea cambiar de cuenta o cerrar sesión, puede hacerlo desde el menú superior.

---

## 🚀 Enlace en Vivo

- **Vercel Producción:** [https://carnet-b-phi.vercel.app](https://carnet-b-phi.vercel.app)
