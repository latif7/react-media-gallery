<?php

namespace Controller;


use lib\Request;

class GalleryController extends ApiController
{

    public function getAllImages(Request $request)
    {
        try {
            $dir    = BASE_PATH . '/Gallery';
            $files = scandir($dir);
            unset($files[0]);
            unset($files[1]);
            $images = [];
            foreach ($files as $file) {
                $images[] = '/Gallery/' . $file;
            }

            return $this->successResponse("Images", $images);
        } catch (\Exception $e) {
            $this->errorResponse(500, "Something went wrong");
        }
    }

    public function upload(Request $request)
    {

        if ($request->hasFile('image')) {
        }
        try {
            $errors = $request->validate([
                "image" => "required|ext:jpeg,png,jpg"
            ]);

            if (count($errors)) {
                return  $this->errorResponse("203",  array_values($errors)[0], $errors);
            }

            $image = $request->input('image');
            move_uploaded_file($image['tmp_name'], BASE_PATH . "/Gallery/" . time() . ".png");
            return $this->successResponse("File uploaded successfully");
        } catch (\Exception $e) {
            return $this->errorResponse(500, "Something went wrong");
        }
    }

    public function getImage(Request $request)
    {
        $image = BASE_PATH . "/Gallery/" . $request->input('image');
        $b64image = base64_encode(file_get_contents($image));
        return $this->successResponse("image", ["image" => $b64image]);
    }

    public function update(Request $request)
    {
        try {
            $img = str_replace('data:image/png;base64,', '', $request->input('image'));
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $file = BASE_PATH . "/Gallery/" . $request->input('fileName');
            $success = file_put_contents($file, $data);
            return $this->successResponse("Image saved successfully", ["image" => $img]);
        } catch (\Exception $e) {
            return $this->errorResponse(500, "Something went wrong");
        }
    }
}
