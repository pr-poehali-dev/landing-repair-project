
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/Icon";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    roomType: "",
    workScope: "",
    style: "",
    budget: "",
    timeframe: "",
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 6;
  const progress = ((quizStep + 1) / totalSteps) * 100;

  const handleAnswerSelect = (question: string, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [question]: answer });
    
    if (quizStep < totalSteps - 1) {
      setQuizStep(quizStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!quizAnswers.name || !quizAnswers.phone || !quizAnswers.email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    // Имитация отправки формы
    toast({
      title: "Успешно!",
      description: "Ваша заявка принята. Мы свяжемся с вами в ближайшее время!",
    });
    
    // Сброс состояния
    setShowQuiz(false);
    setQuizStep(0);
    setQuizAnswers({
      roomType: "",
      workScope: "",
      style: "",
      budget: "",
      timeframe: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ремонт квартир под ключ - быстро, качественно, с гарантией
            </h1>
            <p className="text-xl mb-8">
              Превратим ваше жилье в пространство вашей мечты с профессиональным подходом и вниманием к деталям
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => setShowQuiz(true)}
              >
                Узнать стоимость ремонта
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Icon name="Phone" className="mr-2" />
                Заказать звонок
              </Button>
            </div>
            <div className="mt-6 text-lg">
              <p>Или позвоните нам: <a href="tel:+74951234567" className="font-bold hover:underline">+7 (495) 123-45-67</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">О нашей компании</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Icon name="Clock" size={36} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Работаем более 10 лет</h3>
                <p className="text-gray-600 text-center">
                  Накопленный опыт позволяет нам выполнять работы любой сложности с высоким качеством.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Icon name="Shield" size={36} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Гарантия 3 года</h3>
                <p className="text-gray-600 text-center">
                  Мы уверены в качестве наших работ и даем официальную гарантию на все виды ремонта.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Icon name="Award" size={36} className="text-blue-700" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Сертифицированные мастера</h3>
                <p className="text-gray-600 text-center">
                  В нашей команде только опытные специалисты с профильным образованием.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши работы</h2>
          <Tabs defaultValue="living-room" className="w-full">
            <TabsList className="grid grid-cols-3 md:w-[400px] mx-auto mb-8">
              <TabsTrigger value="living-room">Гостиная</TabsTrigger>
              <TabsTrigger value="kitchen">Кухня</TabsTrigger>
              <TabsTrigger value="bathroom">Ванная</TabsTrigger>
            </TabsList>
            <TabsContent value="living-room">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Современный стиль</h3>
                    <p className="text-gray-600">Комплексный ремонт гостиной с заменой напольного покрытия, выравниванием стен и потолка.</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Классический стиль</h3>
                    <p className="text-gray-600">Капитальный ремонт с перепланировкой и заменой всех коммуникаций.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="kitchen">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Современная кухня</h3>
                    <p className="text-gray-600">Полный ремонт кухни с установкой новой мебели и техники.</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Кухня-студия</h3>
                    <p className="text-gray-600">Объединение кухни с гостиной и создание функционального пространства.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bathroom">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Современная ванная</h3>
                    <p className="text-gray-600">Полная замена сантехники, плитки и коммуникаций.</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-gray-200 aspect-video flex items-center justify-center">До</div>
                    <div className="bg-blue-100 aspect-video flex items-center justify-center">После</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Минималистичный стиль</h3>
                    <p className="text-gray-600">Компактная ванная комната с максимально функциональным использованием пространства.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="ml-4">
                    <h4 className="font-bold">Анна Смирнова</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Делали ремонт в двухкомнатной квартире. Все работы были выполнены в срок и с отличным качеством. Особенно понравилось отношение к мелочам и деталям."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="ml-4">
                    <h4 className="font-bold">Иван Петров</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Ребята сделали капитальный ремонт в моей новой квартире. Результат превзошел все ожидания! Рекомендую всем, кто ценит качество и профессионализм."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="ml-4">
                    <h4 className="font-bold">Елена Козлова</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(4)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} />
                      ))}
                      <Icon name="Star" size={16} className="text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Очень довольна ремонтом кухни. Мастера работали быстро и чисто. Единственное, были небольшие задержки по срокам, но результат того стоил!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Icon name="MapPin" className="mr-2 text-blue-700" />
                    <span>г. Москва, ул. Примерная, д. 123</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Phone" className="mr-2 text-blue-700" />
                    <a href="tel:+74951234567" className="hover:text-blue-700">+7 (495) 123-45-67</a>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Mail" className="mr-2 text-blue-700" />
                    <a href="mailto:info@remont-kvartir.ru" className="hover:text-blue-700">info@remont-kvartir.ru</a>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="mr-2 text-blue-700" />
                    <span>Пн-Пт: 9:00-20:00, Сб: 10:00-18:00</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Мы в социальных сетях:</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100">
                      <Icon name="Facebook" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100">
                      <Icon name="Instagram" />
                    </a>
                    <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100">
                      <Icon name="Youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Остались вопросы?</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <textarea 
                    id="message" 
                    className="w-full border rounded-md p-2 min-h-[100px]"
                    placeholder="Ваш вопрос или комментарий"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-700 hover:bg-blue-800">Отправить</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">О компании</h3>
              <p className="text-gray-300 mb-4">
                Мы выполняем качественный ремонт квартир в Москве и области с 2010 года. 
                Гарантируем качество, соблюдение сроков и чистоту.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Услуги</h3>
              <ul className="text-gray-300 space-y-2">
                <li><a href="#" className="hover:text-blue-400">Косметический ремонт</a></li>
                <li><a href="#" className="hover:text-blue-400">Капитальный ремонт</a></li>
                <li><a href="#" className="hover:text-blue-400">Ремонт под ключ</a></li>
                <li><a href="#" className="hover:text-blue-400">Дизайн интерьера</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <Icon name="MapPin" className="mr-2" size={16} />
                  г. Москва, ул. Примерная, д. 123
                </li>
                <li className="flex items-center">
                  <Icon name="Phone" className="mr-2" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center">
                  <Icon name="Mail" className="mr-2" size={16} />
                  info@remont-kvartir.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Ремонт квартир. Все права защищены.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-blue-400">Политика конфиденциальности</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Рассчитайте стоимость ремонта</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowQuiz(false)}
                >
                  <Icon name="X" />
                </Button>
              </div>
              
              <div className="mb-4">
                <Progress value={progress} className="h-2" />
                <div className="mt-1 text-right text-sm text-gray-500">
                  Шаг {quizStep + 1} из {totalSteps}
                </div>
              </div>

              {quizStep === 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Какой тип помещения вы хотите отремонтировать?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Квартира", "Комната", "Студия", "Другое"].map((option) => (
                      <Button 
                        key={option}
                        variant={quizAnswers.roomType === option ? "default" : "outline"}
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => handleAnswerSelect("roomType", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Какой объем работ вас интересует?</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["Косметический ремонт", "Капитальный ремонт", "Ремонт под ключ"].map((option) => (
                      <Button 
                        key={option}
                        variant={quizAnswers.workScope === option ? "default" : "outline"}
                        className="h-16 flex items-center justify-start px-4"
                        onClick={() => handleAnswerSelect("workScope", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Какой стиль интерьера предпочитаете?</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Современный", "Классический", "Лофт", "Минимализм", "Другой"].map((option) => (
                      <Button 
                        key={option}
                        variant={quizAnswers.style === option ? "default" : "outline"}
                        className="h-16 flex items-center justify-center"
                        onClick={() => handleAnswerSelect("style", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Какой бюджет вы планируете выделить?</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["До 300 000 руб.", "300 000 – 600 000 руб.", "Более 600 000 руб."].map((option) => (
                      <Button 
                        key={option}
                        variant={quizAnswers.budget === option ? "default" : "outline"}
                        className="h-16 flex items-center justify-start px-4"
                        onClick={() => handleAnswerSelect("budget", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">В какие сроки планируете завершить ремонт?</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["До 1 месяца", "1-3 месяца", "Более 3 месяцев"].map((option) => (
                      <Button 
                        key={option}
                        variant={quizAnswers.timeframe === option ? "default" : "outline"}
                        className="h-16 flex items-center justify-start px-4"
                        onClick={() => handleAnswerSelect("timeframe", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 5 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Оставьте ваши контактные данные</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="quiz-name">Ваше имя</Label>
                      <Input 
                        id="quiz-name" 
                        value={quizAnswers.name} 
                        onChange={(e) => setQuizAnswers({...quizAnswers, name: e.target.value})}
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-phone">Телефон</Label>
                      <Input 
                        id="quiz-phone" 
                        value={quizAnswers.phone} 
                        onChange={(e) => setQuizAnswers({...quizAnswers, phone: e.target.value})}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-email">Email</Label>
                      <Input 
                        id="quiz-email" 
                        type="email"
                        value={quizAnswers.email} 
                        onChange={(e) => setQuizAnswers({...quizAnswers, email: e.target.value})}
                        placeholder="example@mail.ru"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Получить расчет стоимости
                    </Button>
                  </form>
                </div>
              )}

              {quizStep > 0 && (
                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePreviousStep}
                  >
                    <Icon name="ArrowLeft" className="mr-2" size={16} />
                    Назад
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Call-to-action Banner */}
      {!showQuiz && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white p-4 flex justify-between items-center z-40">
          <div className="text-lg font-medium">
            Хотите узнать стоимость ремонта вашей квартиры?
          </div>
          <Button 
            onClick={() => setShowQuiz(true)} 
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            Пройти квиз
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
