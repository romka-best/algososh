# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В проектной работе я написал визуализатор алгоритмов, который изучил в течение месяца в Практикуме. Эта проектная работа
заточена на анимацию и поэтапное отображение работы алгоритма, что позволило мне детальнее понять каждый шаг его работы.

Практикум
подготовил [дизайн проекта.](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1) Там
я смог найти необходимые цвета, размеры и примерную раскадровку визуализации.

## Строка

На этом экране мне предстоило развернуть строку

**Компоненты**

Перед тем как приступить к визуализации, на страницу я добавил основные компоненты:

- инпут для ввода исходного текста для разворота;
- кнопку «Развернуть».

![Начальное состояние страницы](README_static/Untitled.png)

Начальное состояние страницы:

Введите текст в инпут и нажмите развернуть.

**Визуализация**

Сначала на экране должно появиться слово, буквы которого записаны в синие кружки

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Два кандидатов на сортировку светятся цветом `#D252E1`. Уже отсортированные элементы выделяются `#7FE051`.

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

Повторяется выделение, пока полностью не развернётся строка.

Анимация выполняется плавно

## Последовательность Фибоначчи

На этом экране я сгенерировал `n` чисел последовательности Фибоначчи.

**Компоненты**

Перед тем как приступить к визуализации, на страницу добавил основные компоненты:

- инпут для ввода целого числа `n`;
- кнопку «Рассчитать», по клику на неё на экране отображается последовательность Фибоначчи до числа `n`.

![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы,

Например, вы ввели 4, тогда на экране должен появиться ряд 1, 1, 2, 3, 5. Есть также ограничение на ввод, в инпут можно
вводить только положительные целые числа. И так как последовательность бесконечна, то есть максимальная граница ввода 1
≤ `n`≤ 19.

**Визуализация**

Элементы отображаются постепенно. Сначала появляется один, потом второй, третий и так до `n`. Пока ряд появился не
полностью, крутится лоадер на кнопку, чтобы избежать повторных кликов.

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

Анимация выполняется плавно

---

## Сортировка массива

На этом экране я визуализировал алгоритмы сортировки выбором и пузырьком

**Компоненты**

Перед тем как приступить к визуализации, на страницу добавил основные компоненты:

- RadioInput для выбора способа сортировки (выбором и пузырьком). По умолчанию стоит значение «Выбор».
- Кнопка «По убыванию», по клику на неё элементы массива сортируются по убыванию, алгоритм сортировки выбирается тот,
  который указан в RadioInput.
- Кнопка «По возрастанию», по клику на неё элементы массива сортируются по возрастанию, алгоритм сортировки выбирается
  тот, который указан в RadioInput.
- Кнопка «Новый массив», по клику на неё функция `randomArr` генерирует новый массив.

Помимо компонентов управления, на странице отображаются элементы массива.

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

Чтобы задать массив случайных чисел, я написал функцию `randomArr`. При написании учтёл, что:

- массив должен состоять из целых чисел $[0; 100]$,
- минимальное количество элементов массива `minLen = 3`, максимальное `maxLen = 17`.

Теперь сгенерированный массив можно отобразить на странице. Максимальное значение элемента массива равно 100, это же
значение является процентным соотношением высоты столбца. В качестве максимальной высоты считаю 340px.

```tsx
// сгенерированный массив
const arr = [ 25, 50, 100 ];
// высоты элементов массива
// `${(340 * arr[i]) / 100}px`
[ '85px', '170px', '340px' ]
```

**Визуализация**

При нажатии на «По убыванию» или «По возрастанию», запускается процесс сортировки в зависимости от выбранного способа:
выбором или пузырьком.

Для анимации сортировки есть два цвета:

- `#D252E1` — элементы, которые сортируем;
- `#7FE051` — отсортированные элементы массива.

Вот пример сортировки выбором по возрастанию для массива `[2, 34, 17, 100, 50]`. Чтобы отсортировать элементы выбором,
сначала находим минимальный элемент, ставим первым элементом в массив и так далее:

1. Два сравниваемых числа — 34 и 2 — выделяем цветом `#D252E1`.
2. Так как 2 меньше 34, с 34 удаляем выделение цветом, 2 остаётся выделен `#D252E1`;
3. Ищем, есть ли в массиве элемент меньше двойки. Претендентов на минимальный элемент по очереди выделяем
   цветом `#D252E1`.
4. Так как 2 — минимальный элемент, меняем его местами с элементом 34 и выделяем цветом `#7FE051`.
5. Смещаемся на один индекс и продолжаем сортировку.

Есть также и ограничения. Добавляю лоадер на активную кнопку и дизейблю все остальные контролы, пока идёт анимация
сортировки.

Сортировка массива выполняется плавно

---

## Стек

На этом экране я визуализировал удаление и добавление элементов в структуру данных "Стек"

**Компоненты**

Перед тем как приступить к визуализации работы со стеком, на страницу добавил основные компоненты:

- Инпут для ввода значений, которые будут добавляться в стек.
- Кнопкa «Добавить», по клику на неё вызывается метод стека `push(item)`.
- Кнопкa «Удалить», по клику на неё вызывается метод стека `pop()`.
- Кнопка «Очистить», чтобы по клику на неё сразу удалялись все элементы из стека.

Больше на странице ничего не должно быть, так как наш стек ещё пуст.

![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления**

Если ввести в инпут значение и нажать «Добавить», в стеке появляется первый элемент, который необходимо отрисовать на
странице.

Для отображения элементов стека использовал компонент Circle. Внутри записано введённое значение, сверху компонента —
указатель на вершину стека `top`, а снизу — номер индекса элемента (для первого элемента — `0` и так далее).

Инпут очищается после добавления элемента в стек.

При добавлении ещё одного элемента справа от предыдущего появляется Circle с новым значением и индексом 1. И теперь уже
над ним оказывается подпись `top`. В момент добавления на долю секунды подсвечивается новый элемент цветом `#D252E1`.

Если в инпуте нет числа, по клику на кнопку «Добавить» метод `push(item)` не вызывается.

**Визуализация удаления**

Если нажать «Удалить», из стека должен извлекаться только верхний элемент. Удаляемый элемент выделяется цветом,
надпись `top` перемещается на его левого соседа.

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека.

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

Есть также и ограничения. Например, при нажатии на кнопку отображается на ней лоадер, а остальные контролы дизейблю.
Ограничен ввод значения до четырёх символов, иначе значение будет странно смотреться в компоненте Circle.

Все анимации на странице выполняются плавно

---

## Очередь

На этом экране мне предстоило визуализировать удаление и добавление элементов в структуру данных «очередь».

**Компоненты**

Перед тем как приступить к визуализации работы с очередью, на страницу я добавил основные компоненты:

- инпут для ввода значений, которые будут добавляться в очередь;
- кнопкa «Добавить», по клику на неё вызывается метод очереди `enqueue(item)`;
- кнопкa «Удалить», по клику на неё вызывается метод очереди `dequeue()`;
- кнопка «Очистить», чтобы по клику на неё сразу удалить все элементы из очереди;
- отображаются пустые элементы очереди c помощью компонента Circle;
- добавил кнопку «Очистить», чтобы по клику на неё сразу удалить все элементы из очереди.

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент должен отобразиться под индексом 0. Также добавил на элемент
указатели `head` и `tail`. Инпут при этом очищается.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении элементов в очередь позиция tail должна смещаться, на пол секунды выделяется новый элемент
цветом `#D252E1`.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Потом убирается выделение и очищается инпут.

Теперь если нажать «Удалить», из очереди должен извлечься элемент под индексом 0 (на долю секунды подсвечивается
элемент `#D252E1`), a `head` будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)

Очередь после `dequeue();`

Все анимации на странице выполняются плавно.

Не забыл и про ограничения. Например, при нажатии на кнопку отображаю на ней лоадер, а остальные контролы дизейблю.
Ограничил ввод значения до четырёх символов, иначе значение будет странно смотреться в компоненте Сircle.

---

## Связный список

На этом экране я реализовал удаление и добавление элементов в связный список.

**Компоненты**

Перед тем как приступить к визуализации работы с очередью, на страницу я добавил основные компоненты.

Для добавления элемента:

- инпут с плейсхолдером «Введите значение» для ввода значения `value`, которое будете добавлять в список;
- кнопка «Добавить в head», по клику на которую значение из инпута должно стать новой головой списка, инпут при этом
  очищаем;
- кнопка «Добавить в tail», по клику на которую значение из инпута должно стать новым хвостом списка, инпут при этом
  очищаем.

Для удаления элемента:

- кнопка «Удалить из head», по клику на которую удаляется первый элемент из списка;
- кнопка «Удалить из tail», по клику на которую удаляется последний элемент из списка.

Для удаления или добавления по индексу:

- инпут с плейсхолдером «Введите индекс» для ввода индекса `ind` элемента связного списка;
- кнопка «Добавить по индексу», по клику на которую значение из инпута `value` должно занять в списке место под
  номером `ind`, инпут с `value` при этом очищаем;
- кнопка «Удалить по индексу», по клику на которую удаляется `ind`-элемент из списка.

Кроме элементов управления, на странице отображается небольшой связный список, например `0 → 34 → 8 → 1`.

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появляется над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано
head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

**При добавлении в tail** элемент появляется в хвосте над элементом с надписью tail. Затем он занимает последнее место в
списке и на долю секунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс». Вся
анимация выполняется поэтапно:

- По клику на «Добавить по индексу» новый элемент отображается над первым элементом.
- Пока ищем нужный индекс, поочерёдно подсвечиваем элементы. Добавляемый элемент перепрыгивает по списку до искомого
  индекса.
- Когда индекс найден, отображаем новый элемент над ним и добавляем.

В этом примере число 10 должно занимать индекс 2.

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34. Новый добавленный элемент выделяю
цветом. Через долю секунды убираю все цветовые выделения и лоадер на кнопке — вставка завершена.

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** сначала необходимо выделять цветом элементы, пока не достигнем нужного индекса.
Затем очистить значение в элементе и снизу отобразить маленький кружок с удаляемым значением.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с
индексом 1, и когда мы дошли до нужного индекса, то удаляем элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail

При добавлении, новый элемент отображается над элементами списка, а при удалении — под ними.

Все анимации на странице выполняются плавно.

Не забыл и про ограничения. Добавляю лоадер на активную кнопку и дизейблю все остальные контролы. Ограничил ввод
значения до четырёх символов, иначе значение будет странно смотреться в компоненте Circle.
