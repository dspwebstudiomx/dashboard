import { useState } from "react";
import axios from "axios";
import Button from "@components/Botones/Button";

import { IoMdAdd } from "react-icons/io";
import {
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaTools,
  FaTag,
} from "react-icons/fa";
import {
  FaAlignLeft,
  FaArrowsRotate,
  FaCheck,
  FaFlag,
  FaLayerGroup,
} from "react-icons/fa6";

const SERVICES = [
  "Consultoria SEO",
  "Consultoría UX/UI",
  "Consultoría de Diseño Web",
  "Desarrollo Web",
  "Diseño Web",
  "E-commerce",
  "Integración de APIs",
  "Landing Page",
  "Mantenimiento Web",
  "Optimización SEO",
  "Rediseño Web",
];

const SECTIONS = [
  "Quienes Somos",
  "Nuestros Servicios",
  "Proyectos",
  "Contacto",
  "Blog",
  "Testimonios",
  "Equipo",
  "Clientes",
  "Portafolio",
  "Ubicación",
  "Preguntas Frecuentes",
  "Términos y Condiciones",
  "Redes Sociales",
  "Política de Privacidad",
  "Política de Cookies",
  "Aviso Legal",
  "Facturación",
];

const ProjectForm = ({
  isEdit,
  project,
  onChange,
  onSubmit,
  setProject,
  SERVICE_COSTS,
  SECTION_COSTS,
}) => {
  // Estados para cupón y descuento
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [cuponMsg, setCuponMsg] = useState("");

  // Calcular totales
  const totalServicios = (project.services || []).reduce(
    (acc, s) => acc + (SERVICE_COSTS[s] || 0),
    0
  );
  const totalSecciones = (project.sections || []).reduce(
    (acc, s) => acc + (SECTION_COSTS[s] || 0),
    0
  );
  const subtotal = totalServicios + totalSecciones;
  const totalFinal = subtotal - (subtotal * descuento) / 100;

  // Validar cupón (puedes conectar con backend aquí)
  const validarCupon = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/cupones/validar?codigo=${cupon}`
      );
      if (res.data.valido) {
        setDescuento(res.data.descuento);
        setCuponMsg(`¡Cupón aplicado! ${res.data.descuento}% de descuento.`);
      } else {
        setDescuento(0);
        setCuponMsg("Cupón inválido o expirado.");
      }
    } catch {
      setDescuento(0);
      setCuponMsg("Error al validar el cupón.");
    }
  };

  return (
    <form
      id="form-proyecto"
      className="flex flex-col gap-6 md:gap-12 p-4 md:p-0 rounded-lg mb-8 overflow-y-auto"
      onSubmit={onSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 w-full">
          <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <FaRegFileAlt className="text-blue-700" />
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="title"
            placeholder="Título del proyecto"
            value={project.title}
            onChange={onChange}
            required
            className="p-2 rounded border"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaRegCalendarAlt className="text-blue-700" />
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={onChange}
                required
                className="p-2 rounded border"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-700" />
                Fecha de Término
              </label>
              <input
                type="date"
                name="dueDate"
                value={project.dueDate}
                onChange={onChange}
                required
                className="p-2 rounded border"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <FaFlag className="text-blue-700" />
              Prioridad
            </label>
            <select
              name="priority"
              value={project.priority}
              onChange={onChange}
              className="p-2 rounded border">
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </div>
      </div>
      {/* Servicios */}
      <div className="flex flex-col gap-8 text-lg">
        <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaTools className="text-blue-700" />
          Tipo de Servicio
        </label>
        <div className="grid md:grid-cols-3 gap-4 md:ml-6">
          {SERVICES.sort((a, b) =>
            a.localeCompare(b, "es", { sensitivity: "base" })
          ).map((service) => (
            <label key={service} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="services"
                value={service}
                checked={
                  Array.isArray(project.services)
                    ? project.services.includes(service)
                    : false
                }
                onChange={(e) => {
                  const checked = e.target.checked;
                  setProject((prev) => {
                    const prevServices = Array.isArray(prev.services)
                      ? prev.services
                      : [];
                    if (checked) {
                      return { ...prev, services: [...prevServices, service] };
                    } else {
                      return {
                        ...prev,
                        services: prevServices.filter((s) => s !== service),
                      };
                    }
                  });
                }}
              />
              <span>
                {service}{" "}
                <span className="text-xs text-gray-500">
                  (${SERVICE_COSTS[service]})
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Secciones */}
      <div className="flex flex-col gap-6 text-lg">
        <label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaLayerGroup className="text-blue-700" />
          Secciones del Proyecto
        </label>
        <div className="grid md:grid-cols-3 gap-4 md:ml-6">
          {SECTIONS.sort((a, b) =>
            a.localeCompare(b, "es", { sensitivity: "base" })
          ).map((section) => (
            <div key={section} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sections"
                value={section}
                checked={
                  Array.isArray(project.sections)
                    ? project.sections.includes(section)
                    : false
                }
                onChange={(e) => {
                  const checked = e.target.checked;
                  setProject((prev) => {
                    const prevSections = Array.isArray(prev.sections)
                      ? prev.sections
                      : [];
                    if (checked) {
                      return { ...prev, sections: [...prevSections, section] };
                    } else {
                      return {
                        ...prev,
                        sections: prevSections.filter((s) => s !== section),
                      };
                    }
                  });
                }}
              />
              <span>
                {section}{" "}
                <span className="text-xs text-gray-500">
                  (${SECTION_COSTS[section]})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Descripción */}
      <div className="flex flex-col gap-6">
        <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaAlignLeft className="text-blue-700" />
          Descripción general del Proyecto
        </label>
        <textarea
          name="description"
          placeholder=""
          value={project.description}
          onChange={onChange}
          required
          className="p-2 rounded border min-h-[220px] dark:bg-gray-600"
        />
      </div>

      {/* Cupón y totales */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaTag className="text-blue-700" />
          Código de cupón
        </label>
        <div className="flex gap-2 flex-col">
          <input
            type="text"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)}
            className="p-2 rounded border flex-1"
            placeholder="Ingresa tu cupón"
          />
          <Button
            variant="primary"
            type="button"
            onClick={validarCupon}
            icon={FaCheck}
            text="Validar cupón"
          />
          <Button
            type="button"
            onClick={() => {
              setCupon("");
              setDescuento(0);
              setCuponMsg("");
            }}
            variant="secondary"
            text="Reiniciar cupón"
            icon={FaArrowsRotate}
          />
        </div>
        {cuponMsg && (
          <span className={descuento > 0 ? "text-green-600" : "text-red-500"}>
            {cuponMsg}
          </span>
        )}
        <div className="mt-6 text-lg font-semibold flex flex-col justify-center w-full items-end gap-4">
          <div>
            Subtotal:{" "}
            <span className="font-semibold text-base">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          {descuento > 0 && (
            <div>
              Descuento:{" "}
              <span className="font-semibold text-green-600">
                -{descuento}%
              </span>
            </div>
          )}
          <div>
            <span className="font-bold">Total: ${totalFinal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        {isEdit ? (
          <Button
            type="button"
            variant="primary"
            text="Actualizar Proyecto"
            icon={FaArrowsRotate}
            onClick={onSubmit}
          />
        ) : (
          <Button
            type="submit"
            variant="primary"
            text="Crear Proyecto"
            icon={IoMdAdd}
          />
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
