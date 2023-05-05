package factory

type Mongodb struct {
	Name string `yaml:"name" valid:"required"`
	Url  string `yaml:"url"  valid:"required"`
}
