CREATE TABLE COLABORADO(
DPI varchar(15) PRIMARY KEY,
Nombres varchar (50),
Apellidos varchar(50),
Apellido_C varchar(25),
Fecha_Inicio date,
Id_Jefe varchar(15),
Contrasenia varbinary(8000),
Correo varchar(200),
id_rol int,
id_depto int
)

CREATE TABLE DEPARTAMENTO(
Id_Depto int primary key,
Departamento varchar(50)
)

CREATE TABLE ROLES(
Id_Rol int primary key,
Rol varchar(25)
)

CREATE TABLE PERMISOS(
Id_Permisos int primary key,
Descripcion varchar(25)
)

CREATE TABLE EXPEDIENTE(
Id_Expediente varchar(20) primary key,
Papeleria varbinary(8000),
DPI varchar(15)
)

CREATE TABLE SOLICITUDES(
Id_Solicitud int primary key,
F_Colaborador bit,
F_Jefe bit,
F_Gerente bit,
Doc_Permiso varbinary(8000),
Fecha_Solicitud date,
FechaI_Permiso date,
FechaF_Permiso date, 
DPI varchar(15),
Id_Permiso int
)

CREATE TABLE BITACORA(
Id_Bitacora int primary key,
Descripcion varchar(1000),
DPI varchar(15)
)

declare @FechaInicial Date = '01/05/2019'
declare @Fechafinal Date = '09/05/2019'

select DATEDIFF (YEAR, @FechaInicial , @Fechafinal )  as resultado

Declare @dia date;
/* numero de días */
declare @numDias int = 28;
SET DATEFIRST 1
   DECLARE @FechaInicio DATE set @FechaInicio = '20210901'
   DECLARE @FechaFin DATE set @FechaFin = '20210930'  
   

;WITH c1
	AS (SELECT number
	    FROM   
		    master..spt_values
	    WHERE  type = 'P  '
	    
	    ),
	d1
	AS (
/* utilizamos el operador top para limitar */
SELECT top(@numDias) DATEADD(day, c1.number, @fechainicio) AS dia
	    FROM   
		    c1
	    WHERE  @FechaFin >= DATEADD(day, c1.number, @fechainicio)
			 AND DATEPART(dw, (DATEADD(day, c1.number, @fechainicio))) < 6)
	
	SELECT ROW_NUMBER() OVER(ORDER BY D1.DIA) AS ROW, D1.dia
	FROM   
		d1;