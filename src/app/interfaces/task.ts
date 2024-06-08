export interface Task {
    id?: number
    titulo: string
    descripcion: string
    estado: TaskStatus
    creado?: string
    actualizado?: string
    usuario_id?: number
    c_fecha?: string
    c_hora?: string
}

export type TaskStatus = 'pendiente' | 'completado' | 'en-proceso'