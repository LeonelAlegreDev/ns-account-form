# Estructura del Proyecto Angular

Este proyecto Angular sigue una arquitectura modular basada en los directorios `core`, `features`, y `shared` para organizar la lógica y los componentes de la aplicación de manera clara y mantenible. A continuación, se describe la estructura de directorios dentro de la carpeta `src/app/` y la cadena de responsabilidad entre los módulos.

## `src/app/`

Este directorio contiene el código fuente principal de la aplicación Angular. Su estructura se divide en los siguientes directorios clave:

### `core/`

Este directorio alberga la lógica central y los servicios singleton de la aplicación. Los servicios dentro de `core` suelen ser instanciados una sola vez durante el ciclo de vida de la aplicación y están disponibles para ser utilizados por todos los demás módulos.

* **`services/`**: Contiene servicios que proporcionan funcionalidades transversales a toda la aplicación. Ejemplos típicos incluyen:
    * Servicios de autenticación (`auth.service.ts`).
    * Servicios para realizar llamadas a la API backend (`api.service.ts`, `[entidad]-api.service.ts`).
    * Servicios de configuración (`config.service.ts`).
    * Servicios de manejo de errores (`error-handler.service.ts`).
    * Servicios de logging (`logger.service.ts`).
    * Estos archivos suelen contener clases decoradas con `@Injectable()` y definen métodos para interactuar con datos o realizar operaciones lógicas a nivel de aplicación.
* **`guards/`**: Contiene clases que implementan las interfaces de enrutamiento (`CanActivate`, `CanLoad`, `CanDeactivate`, `Resolve`). Se utilizan para controlar el acceso a ciertas rutas o módulos basados en condiciones específicas (ej. autenticación, permisos).
    * Los archivos aquí suelen ser clases decoradas con `@Injectable()` que implementan una o más de las interfaces de guard y contienen la lógica para determinar si una ruta puede ser accedida o un módulo puede ser cargado.
* **`interceptors/`**: Contiene clases que implementan la interfaz `HttpInterceptor`. Se utilizan para interceptar y modificar las peticiones HTTP salientes y las respuestas HTTP entrantes a nivel de aplicación (ej. añadir headers de autenticación, manejar errores globales, logging).
    * Estos archivos son clases decoradas con `@Injectable()` que implementan el método `intercept()` de la interfaz `HttpInterceptor`.
* **`models/`**: Contiene interfaces o clases que definen la estructura de los datos utilizados en toda la aplicación (modelos de dominio). Estos modelos son independientes de cualquier módulo de funcionalidad específico.
    * Los archivos aquí suelen ser interfaces (`.ts`) o clases (`.ts`) que definen las propiedades y tipos de los datos.
* **`core.module.ts`**: Este es el módulo Angular que declara e importa todos los servicios, guards e interceptors del directorio `core`. Es importante que este módulo se importe solo una vez en el `AppModule` para asegurar que los servicios sean singletons. No debe declarar componentes.

### `features/`

Este directorio contiene módulos que representan funcionalidades específicas de la aplicación. Cada módulo dentro de `features` debe ser autocontenido y responsable de una parte particular de la interfaz de usuario y su lógica asociada.

* **`[nombre-del-modulo]/`**: Cada subdirectorio dentro de `features` representa un módulo de funcionalidad (ej. `usuarios/`, `productos/`, `pedidos/`).
* Dentro de cada módulo de funcionalidad:
    * **`components/`**: Contiene los componentes de Angular específicos para esta funcionalidad. Estos componentes suelen estar directamente relacionados con la interfaz de usuario de esta característica.
        * Los archivos aquí suelen ser clases decoradas con `@Component()` y sus archivos HTML (`.html`), CSS/SCSS (`.css`, `.scss`) y archivos de prueba (`.spec.ts`).
    * **`services/`**: Contiene servicios específicos para esta funcionalidad. Estos servicios suelen contener la lógica de negocio y la gestión de datos relacionada con la característica.
        * Los archivos aquí suelen ser clases decoradas con `@Injectable()` y se encargan de tareas específicas dentro del módulo de funcionalidad.
    * **`models/`**: Contiene interfaces o clases de datos que son específicas para esta funcionalidad.
        * Al igual que en `core/models`, estos archivos definen la estructura de los datos, pero están acotados al contexto de esta característica.
    * **`[nombre-del-modulo]-routing.module.ts`**: Define las rutas específicas para este módulo de funcionalidad.
    * **`[nombre-del-modulo].module.ts`**: Este es el módulo Angular que declara e importa los componentes, servicios, modelos y el módulo de routing de esta funcionalidad. Suele importar el `SharedModule` si necesita componentes, directivas o pipes reutilizables. Estos módulos pueden ser cargados de forma eager o lazy.

### `shared/`

Este directorio contiene componentes, directivas, pipes y servicios que son reutilizables en múltiples módulos de funcionalidad (`features`). El objetivo es evitar la duplicación de código y proporcionar elementos de UI y lógica comunes a toda la aplicación.

* **`components/`**: Contiene componentes de interfaz de usuario genéricos y reutilizables (ej. botones personalizados, modales, tablas reutilizables, formularios genéricos).
    * Al igual que en `features/components`, estos archivos son clases decoradas con `@Component()` y sus archivos asociados.
* **`directives/`**: Contiene directivas personalizadas que modifican el comportamiento o la apariencia de los elementos del DOM y que pueden ser utilizadas en diferentes partes de la aplicación.
    * Los archivos aquí son clases decoradas con `@Directive()` y contienen la lógica para manipular los elementos del DOM.
* **`pipes/`**: Contiene pipes personalizados para transformar datos en la vista de forma reutilizable.
    * Los archivos aquí son clases decoradas con `@Pipe()` y implementan el método `transform()`.
* **`services/`**: Contiene servicios reutilizables que no están ligados a una funcionalidad específica (ej. servicios de utilidades, validadores personalizados, servicios de notificación genéricos). Los servicios singleton a nivel de aplicación generalmente residen en `core`.
    * Estos archivos son clases decoradas con `@Injectable()`.
* **`models/`**: Contiene interfaces o clases de datos que son compartidas entre diferentes módulos de funcionalidad.
    * Al igual que en `core/models`, estos archivos definen la estructura de datos compartidos.
* **`shared.module.ts`**: Este es el módulo Angular que declara y exporta todos los componentes, directivas y pipes del directorio `shared`. Los módulos de funcionalidad (`features`) importarán este módulo para utilizar sus elementos. Los servicios dentro del `SharedModule` deben ser cuidadosamente considerados; si son singleton a nivel de aplicación, generalmente pertenecen al `CoreModule`.

### Otros archivos dentro de `app/`

* **`app-routing.module.ts`**: Define las rutas principales de la aplicación y configura la carga de los módulos de `features` (tanto eager como lazy).
* **`app.component.ts`**: El componente raíz de la aplicación.
* **`app.module.ts`**: El módulo raíz de la aplicación, donde se importan otros módulos principales como `BrowserModule`, `AppRoutingModule`, y `CoreModule`. También se importan los módulos de `features` que se cargan de forma eager.

## Cadena de Responsabilidad entre `core`, `features`, y `shared`

La interacción entre estos directorios sigue una cadena de responsabilidad con las siguientes características:

1.  **`core` no depende de `features` ni de `shared`**: El módulo `core` es la base de la aplicación y debe ser independiente de las funcionalidades específicas y de los elementos reutilizables de la UI. Los servicios y modelos en `core` son de naturaleza general y no conocen los detalles de las características específicas.

2.  **`features` puede depender de `core` y `shared`**: Los módulos de funcionalidad (`features`) pueden utilizar los servicios, guards, interceptors y modelos definidos en `core` para tareas como autenticación, llamadas a la API, manejo de errores, y utilizar los componentes, directivas y pipes del `shared` para construir su interfaz de usuario y lógica de presentación. Cada módulo de `feature` es responsable de una funcionalidad específica.

3.  **`shared` puede depender de `core` pero no de `features`**: Los componentes, directivas, pipes y servicios dentro de `shared` deben ser lo suficientemente genéricos para ser utilizados por múltiples módulos de `features`. Pueden depender de los modelos y servicios definidos en `core` si necesitan lógica o datos a nivel de aplicación, pero no deben tener dependencias directas de ningún módulo de `feature` específico para mantener su reusabilidad.
