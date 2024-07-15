<?php
class Invitados 
{
    public $id;
    public $apellido;
    public $nombre;
    public $email;

    public function __construct($apellido, $nombre, $email, $id = null) 
    {
        $this->id = $id;
        $this->apellido = $apellido;
        $this->nombre = $nombre;
        $this->email = $email;
    }

    public static function fromArray($data) 
    {
        return new self(
            $data['apellido'] ?? null,
            $data['nombre'] ?? null,
            $data['email'] ?? null,
            $data['id'] ?? null
        );
    }

    public function toArray() 
    {
        return get_object_vars($this);
    }
}
?>
