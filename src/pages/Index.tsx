
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Textarea } from "@/components/ui/textarea";

// Структура для вопросов квиза
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

// Интерфейс для данных формы
interface FormData {
  name: string;
  phone: string;
  email: string;
  comment?: string;
}

function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Вопросы для квиза
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Какой тип помещения вы хотите отремонтировать?",
      options: ["Квартира", "Комната", "Студия", "Другое"],
    },
    {
      id: 2,
      question: "Какой объем работ вас интересует?",
      options: ["Косметический ремонт", "Капитальный ремонт", "Ремонт под ключ"],
    },
    {
      id: 3,
      question: "Какой стиль интерьера предпочитаете?",
      options: ["Современный", "Классический", "Лофт", "Минимализм", "Другой"],
    },
    {
      id: 4,
      question: "Какой бюджет вы планируете выделить?",
      options: ["До 300 000 руб.", "300 000 – 600 000 руб.", "Более 600 000 руб."],
    },
    {
      id: 5,
      question: "В какие сроки планируете завершить ремонт?",
      options: ["До 1 месяца", "1-3 месяца", "Более 3 месяцев"],
    },
  ];

  const handleOptionSelect = (answer: string) => {
    setAnswers({ ...answers, [currentStep]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Очищаем ошибки при вводе
    if (formErrors[name as keyof FormData]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.name.trim()) errors.name = "Имя обязательно";
    if (!formData.phone.trim()) errors.phone = "Телефон обязателен";
    if (!formData.email.trim()) errors.email = "Email обязателен";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Некорректный email";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Здесь будет логика отправки данных
      console.log("Ответы на квиз:", answers);
      console.log("Контактные данные:", formData);
      
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      // Сброс формы и квиза
      setFormData({
        name: "",
        phone: "",
        email: "",
        comment: "",
      });
      setAnswers({});
      setCurrentStep(0);
      setQuizCompleted(false);
      setShowQuiz(false);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentStep(0);
    setQuizCompleted(false);
    setAnswers({});
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Навигация */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Icon name="Home" className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold">РемонтПроф</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-gray-600 hover:text-blue-600">О нас</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600">Услуги</a>
            <a href="#portfolio" className="text-gray-600 hover:text-blue-600">Портфолио</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Отзывы</a>
            <a href="#contacts" className="text-gray-600 hover:text-blue-600">Контакты</a>
          </div>
          
          <div className="flex items-center">
            <span className="hidden md:inline mr-4 text-gray-700">
              <Icon name="Phone" className="inline mr-1 h-4 w-4" />
              +7 (999) 123-45-67
            </span>
            <Button size="sm" variant="outline" className="flex items-center">
              <Icon name="PhoneCall" className="mr-2 h-4 w-4" />
              <span>Обратный звонок</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              Ремонт квартир под ключ{" "}
              <span className="text-blue-600">с гарантией качества</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Выполняем все виды ремонтных работ: от косметического до капитального ремонта. 
              Фиксированные сроки по договору и никаких скрытых платежей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={startQuiz} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Рассчитать стоимость ремонта
              </Button>
              <Button size="lg" variant="outline">
                Наши работы
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Ремонт квартиры" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Квиз */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Рассчитайте стоимость ремонта</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowQuiz(false)} 
                  className="h-8 w-8 p-0"
                >
                  <Icon name="X" className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  Шаг {currentStep + 1} из {questions.length}
                </p>
              </div>
              
              {!quizCompleted ? (
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    {questions[currentStep].question}
                  </h3>
                  <div className="grid gap-3">
                    {questions[currentStep].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={answers[currentStep] === option ? "default" : "outline"}
                        className="justify-start h-auto py-3 text-left"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={handlePrevious} className="flex items-center">
                        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                        Назад
                      </Button>
                    )}
                    {currentStep === 0 && <div></div>}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-xl font-medium mb-4">
                    Получите результат расчета
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Оставьте свои контактные данные, и мы пришлем вам детальный расчет стоимости ремонта
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Ваше имя"
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+7 (___) ___-__-__"
                        className={formErrors.phone ? "border-red-500" : ""}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="example@mail.ru"
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="comment">Комментарий (опционально)</Label>
                      <Textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleFormChange}
                        placeholder="Дополнительная информация о ремонте"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex items-center"
                    >
                      <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                      Назад
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Получить расчет
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* О компании */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">О нашей компании</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-4">
                  <Icon name="Clock" className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">10+ лет опыта</h3>
                <p className="text-gray-600">
                  Работаем на рынке с 2013 года и выполнили более 500 ремонтных проектов различной сложности.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-4">
                  <Icon name="Shield" className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Гарантия качества</h3>
                <p className="text-gray-600">
                  Даем официальную гарантию на все виды работ сроком до 3 лет с документальным оформлением.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-4">
                  <Icon name="Users" className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Профессиональная команда</h3>
                <p className="text-gray-600">
                  В нашей команде только сертифицированные мастера с опытом работы от 5 лет.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <Tabs defaultValue="cosmetic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cosmetic">Косметический ремонт</TabsTrigger>
              <TabsTrigger value="capital">Капитальный ремонт</TabsTrigger>
              <TabsTrigger value="turnkey">Ремонт под ключ</TabsTrigger>
            </TabsList>
            <TabsContent value="cosmetic" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Косметический ремонт</h3>
                  <p className="text-gray-600 mb-6">
                    Идеальное решение, если вам нужно освежить интерьер без серьезных конструктивных изменений.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Покраска стен и потолков</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Замена напольных покрытий</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Обновление плинтусов и молдингов</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Замена дверей и фурнитуры</span>
                    </li>
                  </ul>
                  <Button className="mt-6">
                    Узнать стоимость
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" 
                    alt="Косметический ремонт" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="capital" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Капитальный ремонт</h3>
                  <p className="text-gray-600 mb-6">
                    Комплексное обновление пространства с заменой инженерных коммуникаций и перепланировкой.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Демонтаж старых конструкций</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Замена электропроводки и сантехники</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Возведение новых перегородок</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Полная отделка всех поверхностей</span>
                    </li>
                  </ul>
                  <Button className="mt-6">
                    Узнать стоимость
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                    alt="Капитальный ремонт" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="turnkey" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Ремонт под ключ</h3>
                  <p className="text-gray-600 mb-6">
                    Полное преображение пространства от проектирования до финальной уборки и расстановки мебели.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Разработка дизайн-проекта</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Все виды строительных и отделочных работ</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Подбор и установка мебели и техники</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="Check" className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Финальная уборка и подготовка к заселению</span>
                    </li>
                  </ul>
                  <Button className="mt-6">
                    Узнать стоимость
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                    alt="Ремонт под ключ" 
                    className="w-full h-auto" 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Примеры работ */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Проект 1 */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Проект квартиры в современном стиле" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="py-4">
                <h3 className="text-lg font-semibold mb-2">Квартира в современном стиле</h3>
                <p className="text-sm text-gray-600 mb-3">Ремонт под ключ, 78 м²</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Срок: 2 месяца</span>
                  <Button variant="outline" size="sm">
                    Детали проекта
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Проект 2 */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Проект студии в скандинавском стиле" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="py-4">
                <h3 className="text-lg font-semibold mb-2">Студия в скандинавском стиле</h3>
                <p className="text-sm text-gray-600 mb-3">Косметический ремонт, 42 м²</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Срок: 3 недели</span>
                  <Button variant="outline" size="sm">
                    Детали проекта
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Проект 3 */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Проект двухкомнатной квартиры в стиле лофт" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="py-4">
                <h3 className="text-lg font-semibold mb-2">Двухкомнатная квартира в стиле лофт</h3>
                <p className="text-sm text-gray-600 mb-3">Капитальный ремонт, 65 м²</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Срок: 2.5 месяца</span>
                  <Button variant="outline" size="sm">
                    Детали проекта
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="text-blue-600 border-blue-600">
              Смотреть все проекты
              <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Отзыв 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Анна К." 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Анна К.</h4>
                    <div className="flex text-yellow-400">
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Очень довольна результатом! Ремонт выполнили даже раньше срока, указанного в договоре. Качество на высоте, все материалы соответствуют тем, что были заявлены. Буду рекомендовать друзьям."
                </p>
              </CardContent>
            </Card>

            {/* Отзыв 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Дмитрий М." 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Дмитрий М.</h4>
                    <div className="flex text-yellow-400">
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="StarHalf" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Делали капитальный ремонт в двушке. Работой доволен, мастера профессиональные и вежливые. Единственное — немного затянули со сроками, но результат компенсировал ожидание."
                </p>
              </CardContent>
            </Card>

            {/* Отзыв 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Екатерина П." 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Екатерина П.</h4>
                    <div className="flex text-yellow-400">
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                      <Icon name="Star" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Заказывала ремонт под ключ. Результат просто потрясающий! Команда сделала всё именно так, как я хотела, и даже лучше. Особая благодарность дизайнеру, который учел все мои пожелания."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Свяжитесь с нами</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Наши контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Icon name="MapPin" className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Адрес:</p>
                    <p className="text-gray-600">г. Москва, ул. Строителей, д. 15, офис 301</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="Phone" className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Телефон:</p>
                    <p className="text-gray-600">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="Mail" className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email:</p>
                    <p className="text-gray-600">info@remont-prof.ru</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="Clock" className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Режим работы:</p>
                    <p className="text-gray-600">Пн-Пт: 9:00-20:00, Сб: 10:00-18:00</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Мы в социальных сетях</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Icon name="Facebook" className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Icon name="Twitter" className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white">
                  <Icon name="Instagram" className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <Icon name="Youtube" className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Есть вопросы? Напишите нам</h3>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Ваше имя</Label>
                      <Input id="contact-name" placeholder="Иван Петров" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Телефон</Label>
                      <Input id="contact-phone" placeholder="+7 (___) ___-__-__" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="example@mail.ru" />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <Textarea 
                        id="contact-message" 
                        placeholder="Задайте ваш вопрос или опишите задачу" 
                        rows={4} 
                      />
                    </div>
                    <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700">
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Icon name="Home" className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">РемонтПроф</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Качественный ремонт квартир под ключ с гарантией в Москве и области.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Facebook" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Twitter" className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Icon name="Instagram" className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">Косметический ремонт</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Капитальный ремонт</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Ремонт под ключ</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Дизайн интерьера</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Перепланировка</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">О компании</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Цены на услуги</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Портфолио</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Отзывы</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Контакты</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <Icon name="MapPin" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span>г. Москва, ул. Строителей, д. 15</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Phone" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span>+7 (999) 123-45-67</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Mail" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span>info@remont-prof.ru</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Clock" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <span>Пн-Пт: 9:00-20:00, Сб: 10:00-18:00</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              2025 РемонтПроф. Все права защищены.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
