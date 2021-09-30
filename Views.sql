create VIEW V_SOLICITUDES_JEFE
AS SELECT c.Nombres + ' ' + c.Apellidos as Nombre, c.DPI, s.Fecha_Solicitud, s.FechaI_Permiso, s.FechaF_Permiso, p.Descripcion  from SOLICITUDES s
inner join COLABORADO c
on s.DPI = c.DPI
inner join PERMISOS p
on s.Id_Permiso = p.Id_Permisos
where s.F_Jefe = 0 and s.F_Gerente = 0 AND s.Estado = 3

create VIEW V_SOLICITUDES_GERENTE
AS SELECT c.Nombres + ' ' + c.Apellidos as Nombre, c.DPI, s.Fecha_Solicitud, s.FechaI_Permiso, s.FechaF_Permiso, p.Descripcion  from SOLICITUDES s
inner join COLABORADO c
on s.DPI = c.DPI
inner join PERMISOS p
on s.Id_Permiso = p.Id_Permisos
where s.F_Gerente = 0 AND s.Estado = 3

create VIEW V_SOLICITUDES_RRHH
AS SELECT c.Nombres + ' ' + c.Apellidos as Nombre, c.DPI, s.Fecha_Solicitud, s.FechaI_Permiso, s.FechaF_Permiso, p.Descripcion  from SOLICITUDES s
inner join COLABORADO c
on s.DPI = c.DPI
inner join PERMISOS p
on s.Id_Permiso = p.Id_Permisos
where s.Estado = 3

alter VIEW V_SOLICITUDES_FINAL
AS SELECT c.Nombres + ' ' + c.Apellidos as Nombre, c.DPI, s.Fecha_Solicitud, s.FechaI_Permiso, s.FechaF_Permiso, p.Descripcion, ep.Estado  from SOLICITUDES s
inner join COLABORADO c
on s.DPI = c.DPI
inner join PERMISOS p
on s.Id_Permiso = p.Id_Permisos
INNER JOIN ESTADO_PERMISO ep
on s.Estado = ep.Id_Estado
where s.Estado != 3

/*EMPLEADOS BAJO MANDO DESDE JAVASCRIP ENVIANDO EL DPI DEL JEFE*/