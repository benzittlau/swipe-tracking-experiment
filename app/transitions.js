export default function(){
  this.transition(
    this.fromRoute('one'),
    this.toRoute('two'),
    this.use('trackMouse'),
    this.reverse('toRight')
  )
};
