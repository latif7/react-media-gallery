<?php

namespace lib;


class Validator
{

    private $_errors = [];
    private $data = [];

    /**
     * @param $key
     * @return bool
     */
    public function checkRequired($key)
    {
        return (isset($this->data[$key]) && !empty($this->data[$key])) ? true : false;
    }

    /**
     * @param $key
     * @param $length
     * @return bool
     */
    public function checkLength($key, $length)
    {
        return (isset($this->data[$key]) && mb_strlen($this->data[$key]) > $length) ? false : true;
    }


    /**
     * @param  array $data
     * @param $rules
     * @return array
     * @throws \Exception
     */
    public function checkValidation($data, $rules)
    {

        $this->data = $data;

        foreach ($rules as $key => $value) {
            $fieldName = str_replace('_', ' ', $key);

            $xrules = explode('|', $value); // split string to array [required,integer]

            foreach ($xrules as $rule) {

                $arule = explode(':', $rule);
                $ruleName = strtolower($arule[0]);

                switch ($ruleName) {
                    case 'required':
                        if (!$this->checkRequired($key)) {
                            $this->_errors[$key] = "The " . $fieldName . " field is required";
                        }
                        break;
                    case 'max':
                        if (!$this->checkLength($key, $arule[1])) {
                            $this->_errors[$key] = "The " . $fieldName . " should be less then " . ($arule[1] + 1) . " characters";
                        }
                        break;
                    case 'ext':
                        $extensions = is_array($arule[1]) ? $arule[1] : explode(',', strtolower($arule[1]));
                        $fileName = $this->data[$key]['name'];
                        $ext = explode('.', $fileName);
                        $ext = end($ext);
                        $ext = strtolower($ext);

                        if (in_array($ext, $extensions) === false) {
                            $this->_errors[$key] = "Invalid File type";
                        }

                        break;
                    default:
                        throw new \Exception("Undefined validation rule");
                        break;
                }

                if (isset($this->_errors[$key])) {
                    break;
                }
            }
        }
        return $this->_errors;
    }

    /**
     * @return bool
     */
    public function pass()
    {
        return count($this->_errors) ? false : true;
    }

    /**
     * @return bool
     */
    public function fails()
    {
        return count($this->_errors) ? true : false;
    }

    public function getErrors()
    {
        return $this->_errors;
    }
}
