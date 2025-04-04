<?php
    header("Content-type: application/json; charset=utf-8");

    $fecha = '2025-04-12';
    $hora = '17:00:00';
    $latitude = '43.91722';
    $longitude = '-2.895555';

    //Divido URL para mejorar legibilidad
    $urlComienzo = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    $urlCoordenadas = $latitude . ',' . $longitude . '/';
    $urlFechaYHora = $fecha . 'T' . $hora;
    $urlFinal = '?key=TQEBS5KHDJ3VMS6TWD4847UP2&include=current';

    $urlCompleta = $urlComienzo . $urlCoordenadas . $urlFechaYHora . $urlFinal;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $urlCompleta);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);


    if ($httpCode == 200) {
        $data = json_decode($response, true);

        foreach ($data['days'] as $day) {
            $informacionBuscada = [
                'minTemperature' => fahrenheitToCelsius($day['tempmin']),
                'temperature' => fahrenheitToCelsius($day['temp']),
                'maxTemperature' => fahrenheitToCelsius($day['tempmax']),
                'windSpeed' => round($day['windspeed']),
                'icon' => $day['icon']
            ];
        }


        $weatherJSON= json_encode($informacionBuscada, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        echo $weatherJSON;
    }

    else{
        $respuesta = ['error' => 'Problema al llamar a la API'];
        echo json_encode($respuesta);
    }

    function fahrenheitToCelsius($tempInFahrenheit)
    {
        return round(($tempInFahrenheit - 32) * 5 / 9);
    }
?>